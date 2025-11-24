import numpy as np
import re
from sklearn.metrics.pairwise import cosine_similarity
from config import model

WEIGHTS = {
    'semantic_sim': 0.70,   
    'ca_sim': 0.20,         
    'subject_sim': 0.10     
}

def local_sim_ca(new, old):
    return 1.0 if new['cause_of_action'].lower().strip() == old['cause_of_action'].lower().strip() else 0.0

def local_sim_subject(new, old):
    new_words = set(re.findall(r'\b\w+\b', new["subject_matter"].lower()))
    old_words = set(re.findall(r'\b\w+\b', old["subject_matter"].lower()))
    return len(new_words & old_words) / min(len(new_words), len(old_words)) if new_words and old_words else 0.0

def constitutional_cbr(new_case, case_base, case_vectors, top_k=5):
    new_vec = model.encode([new_case["key_facts"]], convert_to_numpy=True).reshape(1, -1)
    semantic_scores = cosine_similarity(new_vec, case_vectors)[0]

    results = []
    for idx, case in enumerate(case_base):
        
        structured_score = (
            local_sim_ca(new_case, case) * WEIGHTS['ca_sim'] +
            local_sim_subject(new_case, case) * WEIGHTS['subject_sim']
        )

        total_score = (
            semantic_scores[idx] * WEIGHTS['semantic_sim'] +
            structured_score * (1.0 - WEIGHTS['semantic_sim'])
        )

        results.append({**case, "score": float(total_score)})

    return sorted(results, key=lambda x: x['score'], reverse=True)[:top_k]
