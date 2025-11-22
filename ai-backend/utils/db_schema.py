from config import r_text as r

def get_new_document_id():
    return r.incr("document_counter")  

def get_new_chunk_id():
    return r.incr("chunk_counter") 

def store_document_record(doc_id, doc_name, total_chunks):
    r.hset(f"document:{doc_id}", mapping={
        "document_id": doc_id,
        "document_name": doc_name,
        "total_chunks": total_chunks
    })
