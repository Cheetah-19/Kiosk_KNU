from .face_extractor import extractor
import numpy as np


# 프론트에서 받은 base64 리스트를 embedding 리스트로 변환
def base_to_vector(face_bases: list) -> list:
    embedding_list = []

    for base in face_bases:
        # base64 -> embedding
        input_embedding = extractor(base)

        if input_embedding is not None:
            embedding_list.append(input_embedding)
    return embedding_list
