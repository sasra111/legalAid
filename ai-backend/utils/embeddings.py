import numpy as np, json
from sentence_transformers import SentenceTransformer
from utils.preprocess import extract_pdf_text, clean_legal_text, sent_tokenize, chunk_sentences
from config import redis_client as r

model = SentenceTransformer("sentence-transformers/all-mpnet-base-v2")

def process_and_store(pdf_path, doc_id, title):
    raw = extract_pdf_text(pdf_path)
    cleaned = clean_legal_text(raw)
    sentences = sent_tokenize(cleaned)
    chunks = chunk_sentences(sentences)
    
    embeddings = model.encode(chunks, convert_to_numpy=True)

    for i, emb in enumerate(embeddings):
        key = f"case_vectors:{doc_id}:chunk_{i+1}"
        r.hset(key, mapping={
            "embedding": emb.tobytes(),
            "metadata": json.dumps({
                "doc_id": doc_id,
                "chunk_id": str(i+1),
                "title": title,
                "chunk_text": chunks[i]
            })
        })
    return len(chunks)
