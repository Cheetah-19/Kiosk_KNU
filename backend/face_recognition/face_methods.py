from .face_extractor import extractor

def base_to_vector(face_bases:list) -> list :
    # front로 받은 base64 리스트를 vector리스트로 변환
    vector_list = []
    print("hello")
    for base in face_bases: #2. 리스트 안의 base64들을 벡터로 변환
        input_vector = extractor(base) # base64 -> vector (extractor)
        if input_vector != None:
            vector_list.append(input_vector)
    
    return vector_list
