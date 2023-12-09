import numpy as np


# 한 user의 face info와 프론트에서 찍은 사진의 embedding을 코사인 유사도 방식으로 거리 계산
def findCosineDistance(db_list, target):
    a = np.dot(db_list, target)
    b = np.linalg.norm(db_list, axis=1)
    c = np.sqrt(np.sum(np.multiply(target, target)))

    return 1 - (a / (b * c))


# 한 user의 face info와 프론트에서 찍은 사진의 embedding의 최단 거리 반환
def identification(db_embedding_list, target_embedding):
    return np.min(findCosineDistance(db_embedding_list, target_embedding))
