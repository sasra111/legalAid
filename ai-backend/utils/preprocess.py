import re
from pdfminer.high_level import extract_text
from nltk.tokenize import sent_tokenize

def extract_pdf_text(pdf_path):
    return extract_text(pdf_path)

def clean_legal_text(text):
    text = re.sub(r'\n+', ' ', text)
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'Page\s+\d+\s+of\s+\d+', '', text, flags=re.I)
    text = re.sub(r'(\w+)-\s+(\w+)', r'\1\2', text)
    text = text.replace('“', '"').replace('”', '"').replace("’", "'")
    return text.strip()

def chunk_sentences(sentences, chunk_size=400):
    chunks, current, length = [], [], 0
    for s in sentences:
        length += len(s.split())
        current.append(s)
        if length >= chunk_size:
            chunks.append(" ".join(current))
            current, length = [], 0
    if current:
        chunks.append(" ".join(current))
    return chunks
