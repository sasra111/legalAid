import json
import numpy as np
from typing import List
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from redis import Redis
from sentence_transformers import SentenceTransformer, util

# Redis connection
r = Redis(
    host="redis-12128.c263.us-east-1-2.ec2.cloud.redislabs.com",
    port=12128,
    decode_responses=False,
    username="default",
    password="9FipQ6XWXVT1xJIaivdWztCkM26W8yRb",
)

# Load same embedding model
model = SentenceTransformer("nlpaueb/legal-bert-base-uncased")

# Memory cache
EMBEDDINGS, CHUNKS, METADATA = None, [], []


app = FastAPI(title="Legal Aid Semantic Search API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
    ],  # Frontend origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
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


@app.on_event("startup")
def load_embeddings():
    global EMBEDDINGS, CHUNKS, METADATA

    keys = sorted(r.keys("case_vectors:*"))
    vectors, chunks, meta_list = [], [], []

    for k in keys:
        emb_bytes = r.hget(k, "embedding")
        if not emb_bytes:
            continue
        emb = np.frombuffer(emb_bytes, dtype=np.float32)

        meta = json.loads(r.hget(k, "metadata"))
        vectors.append(emb)
        chunks.append(meta["chunk_text"])
        meta_list.append(meta)

    EMBEDDINGS = np.vstack(vectors) if vectors else np.empty((0, 768), dtype=np.float32)
    CHUNKS, METADATA = chunks, meta_list

    print(f"Loaded {len(CHUNKS)} chunks from Redis.")


@app.get("/searchJudgements", response_model=SearchResponse)
def search(query: str = Query(...), top_k: int = 5):
    if EMBEDDINGS.shape[0] == 0:
        return SearchResponse(query=query, top_k=0, total_chunks=0, results=[])

    query_emb = model.encode([query])
    scores = util.cos_sim(query_emb, EMBEDDINGS)[0].cpu().numpy()
    top_idx = np.argsort(scores)[::-1][:top_k]

    results = [
        SearchResult(
            doc_id=METADATA[i].get("doc_id", ""),
            chunk_id=METADATA[i].get("chunk_id", ""),
            title=METADATA[i].get("title", ""),
            chunk_text=CHUNKS[i],
            score=float(scores[i]),
        )
        for i in top_idx
    ]

    return SearchResponse(
        query=query, top_k=top_k, total_chunks=len(CHUNKS), results=results
    )
