import base64
from PIL import Image
import io
import numpy as np
from deepface import DeepFace
from deepface.commons import functions
import cv2
import matplotlib.pyplot as plt

# recognizer
model_name = 'Facenet512'
target_size = functions.find_target_size(model_name)


def extractor(base64_string):
    # base64_string 전처리
    base64_string = base64_string.split(',')[1]
    # string -> base64
    img_data = base64.b64decode(base64_string)
    # base64 -> image
    img = np.array(Image.open(io.BytesIO(img_data)))

    # 사진 보기
    # img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    # plt.imshow(img)
    # plt.show()

    try:
        # 얼굴 영역 추출
        face = DeepFace.extract_faces(img_path=img, target_size=target_size, detector_backend='ssd')
        face = face[0]['facial_area']
        x, y, w, h = face['x'], face['y'], face['w'], face['h']
        face = img[y:y + h, x:x + w]

        # 임베딩
        embedding_img = DeepFace.represent(img_path=face, model_name=model_name, detector_backend='skip')[0]['embedding']
        return embedding_img
    except:
        return None
