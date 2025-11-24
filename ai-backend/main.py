import json, uuid, shutil
import numpy as np
from typing import List
from fastapi import FastAPI, Query, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sentence_transformers import util
from config import r_raw, r_text, model
from utils.preprocess import extract_pdf_text, clean_legal_text, chunk_sentences
from utils.db_schema import get_new_document_id, store_document_record
from utils.embeddings import process_and_store, sent_tokenize
from utils.cbr import compute_cbr_similarity

EMBEDDINGS, CHUNKS, METADATA = None, [], []

app = FastAPI(title="Legal Aid AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
    ], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],  
)

class SearchResult(BaseModel):
    doc_id: str
    chunk_id: str
    title: str
    chunk_text: str
    score: float

class SearchResponse(BaseModel):
    query: str
    top_k: int
    total_chunks: int
    results: List[SearchResult]

class NewCase(BaseModel):
    cause_of_action: str
    subject_matter: str
    statute_ordinance_applied: list
    key_facts: str

with open("casebase/contract_cases.json", "r") as f:
    CASE_BASE = json.load(f)

CASE_VECTORS = []
for case in CASE_BASE:
    vector = model.encode([case["key_facts"]], convert_to_numpy=True).flatten()
    CASE_VECTORS.append(vector)

CASE_VECTORS = np.vstack(CASE_VECTORS) 

@app.on_event("startup")
def load_embeddings():
    global EMBEDDINGS, CHUNKS, METADATA

    chunk_keys = sorted(r_text.keys("chunk:*"))
    vectors, chunks, meta_list = [], [], []

    for key in chunk_keys:
        # embedding must be read with r_raw
        emb_bytes = r_raw.hget(key, "embedding")
        if emb_bytes:
            emb = np.frombuffer(emb_bytes, dtype=np.float32)
            vectors.append(emb)

        # only request SAFE text fields
        chunk_text = r_text.hget(key, "chunk_text")
        doc_id     = r_text.hget(key, "document_id")
        chunk_id   = r_text.hget(key, "chunk_id")

        chunks.append(chunk_text)
        meta_list.append({
            "chunk_id": chunk_id,
            "document_id": doc_id,
            "chunk_text": chunk_text,
        })

    EMBEDDINGS = np.vstack(vectors) if vectors else np.empty((0, 768), dtype=np.float32)
    CHUNKS = chunks
    METADATA = meta_list

    print(f"Loaded {len(CHUNKS)} chunks from Redis.")

@app.get("/")
def home():
    return {"message": "AI Backend is running!"}


@app.get("/searchJudgements", response_model=SearchResponse)
def search_judgements(query: str = Query(...), top_k: int = 5):
    if EMBEDDINGS.shape[0] == 0:
        return SearchResponse(
            query=query,
            top_k=0,
            total_chunks=0,
            results=[]
        )

    # 1. Encode query and compute cosine scores
    query_emb = model.encode([query])
    scores = util.cos_sim(query_emb, EMBEDDINGS)[0].cpu().numpy()

    # 2. Top chunk indices
    top_idx = np.argsort(scores)[::-1][:top_k]

    results = []
    for i in top_idx:
        # retrieve chunk metadata
        meta = METADATA[i]  # contains document_id

        # Fetch document information using document_id
        doc_id = meta.get("document_id", "")
        doc_data = r_text.hgetall(f"document:{doc_id}")  # master table lookup
        title = doc_data.get("document_name", "Unknown Document")

        # prepare response
        results.append(
            SearchResult(
                doc_id=doc_id,
                chunk_id=meta.get("chunk_id", ""),
                title=title,
                chunk_text=CHUNKS[i],
                score=float(scores[i]),
            )
        )

    return SearchResponse(
        query=query,
        top_k=top_k,
        total_chunks=len(CHUNKS),
        results=results
    )


@app.post("/upload-document")
async def upload_document(file: UploadFile = File(...)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(400, "Only PDF files allowed.")

    temp_path = f"temp_{uuid.uuid4().hex}.pdf"
    with open(temp_path, "wb") as f:
        shutil.copyfileobj(file.file, f)

    # Create new document ID
    doc_id = get_new_document_id()
    title = file.filename.replace(".pdf", "")

    #process PDF and create chunks + embeddings
    chunk_count = process_and_store(temp_path, doc_id)

    # Store master document record
    store_document_record(doc_id, title, chunk_count)

    return {
        "status": "success",
        "document_id": doc_id,
        "document_name": title,
        "chunks_created": chunk_count,
        "message": f"Document '{title}' embedded successfully."
    }

@app.post("/findSimilarCases")
def find_similar_cases(new_case: NewCase, top_k: int = 5):
    result = compute_cbr_similarity(new_case.dict(), CASE_BASE, CASE_VECTORS, top_k)
    return result