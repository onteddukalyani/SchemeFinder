def precision_at_k(retrieved, relevant, k):
    retrieved_k = retrieved[:k]

    relevant_retrieved = sum(
        1 for item in retrieved_k if item in relevant
    )

    return relevant_retrieved / k
def recall_at_k(retrieved, relevant, k):
    retrieved_k = retrieved[:k]

    relevant_retrieved = sum(
        1 for item in retrieved_k if item in relevant
    )

    if len(relevant) == 0:
        return 0

    return relevant_retrieved / len(relevant)


def average_precision(retrieved, relevant):
    score = 0
    relevant_found = 0

    for i, item in enumerate(retrieved):
        if item in relevant:
            relevant_found += 1
            precision = relevant_found / (i + 1)
            score += precision

    if len(relevant) == 0:
        return 0

    return score / len(relevant)