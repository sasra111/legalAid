import re
from sklearn.metrics.pairwise import cosine_similarity
from config import model

# Weight configuration
WEIGHTS = {
    'semantic_sim': 0.50,  
    'ca_sim': 0.25,        
    'statute_sim': 0.15,   
    'subject_sim': 0.10    
}

# Local Similarity Function

def local_sim_ca(c_new, c_old):
    return 1.0 if c_new['cause_of_action'].lower().strip() == c_old['cause_of_action'].lower().strip() else 0.0

def local_sim_statute(c_new, c_old):
    new_set = set([s.strip() for s in c_new['statute_ordinance_applied']])
    old_set = set([s.strip() for s in c_old['statute_ordinance_applied']])
    if not new_set or not old_set:
        return 0.0
    return len(new_set.intersection(old_set)) / len(new_set.union(old_set))

def local_sim_subject(c_new, c_old):
    new_words = set(re.findall(r'\b\w+\b', c_new['subject_matter'].lower()))
    old_words = set(re.findall(r'\b\w+\b', c_old['subject_matter'].lower()))
    if not new_words or not old_words:
        return 0.0
    return len(new_words.intersection(old_words)) / min(len(new_words), len(old_words))


# Global Similarity Function

def compute_cbr_similarity(new_case, case_base, case_vectors, top_k=5):
    # Semantic similarity from LegalBERT
    new_vec = model.encode([new_case["key_facts"]], convert_to_numpy=True).reshape(1, -1)
    semantic_scores = cosine_similarity(new_vec, case_vectors)[0]

    results = []
    for idx, case in enumerate(case_base):
        structured_score = (
            local_sim_ca(new_case, case) * WEIGHTS['ca_sim'] +
            local_sim_statute(new_case, case) * WEIGHTS['statute_sim'] +
            local_sim_subject(new_case, case) * WEIGHTS['subject_sim']
        )

        total_score = (
            semantic_scores[idx] * WEIGHTS['semantic_sim'] +
            structured_score * (1.0 - WEIGHTS['semantic_sim'])
        )

        results.append({**case, "score": float(total_score)})

    return sorted(results, key=lambda x: x["score"], reverse=True)[:top_k]
