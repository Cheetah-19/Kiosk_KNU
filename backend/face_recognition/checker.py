from face_recognition.deepface import DeepFace
from face_recognition.deepface.commons import functions
from face_recognition.extractor import homomorphic_filter, resize_with_padding
from keras.models import load_model
import numpy as np


# 마스크 유무 판별 모델의 input size
target_size = (150, 150)

model = load_model('./face_recognition/mask_model.h5')


def isFace(base64):
    try:
        # 1. base64 -> image
        img = functions.loadBase64Img(base64)

        # 2. image -> face (얼굴 영역 추출)
        face = DeepFace.extract_faces(img_path=img, target_size=target_size, detector_backend='ssd')[0]['facial_area']
        x, y, w, h = face['x'], face['y'], face['w'], face['h']
        face = img[y:y + h, x:x + w]

        # 조명 조정
        face = homomorphic_filter(face)

        # 이미지 크기 조정
        face = resize_with_padding(face, target_size)

        # 이미지 전처리
        face = face[:, :, ::-1]
        face = face.astype(np.float64) / 255.0

        # 마스크 유무 판별
        face = np.expand_dims(face, axis=0)
        value = model.predict(face)

        print(value)
        if value <= 0.5:
            return False
        else:
            return True
    except:
        return False
