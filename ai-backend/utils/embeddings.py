import numpy as np, json
from nltk.tokenize import sent_tokenize
from utils.preprocess import extract_pdf_text, clean_legal_text, chunk_sentences
from config import r_text, r_raw, model
from utils.db_schema import get_new_chunk_id

def process_and_store(pdf_path, doc_id):
    raw = extract_pdf_text(pdf_path)
    cleaned = clean_legal_text(raw)
    sentences = sent_tokenize(cleaned)
    chunks = chunk_sentences(sentences)
    
    embeddings = model.encode(chunks, convert_to_numpy=True)

    for chunk_text, emb in zip(chunks, embeddings):
        chunk_id = get_new_chunk_id()

        r_raw.hset(f"chunk:{chunk_id}", mapping={
            "embedding": emb.tobytes()
        })

        r_text.hset(f"chunk:{chunk_id}", mapping={
            "chunk_id": chunk_id,
            "document_id": doc_id,
            "chunk_text": chunk_text,
        })
    return len(chunks)

