from deepface import DeepFace
from deepface.commons import functions, distance as dst
import cv2
import numpy as np
import os

name_list = []
vvl = []

path = './db/'
file_list = os.listdir(path)
for file in file_list:
    name_list.append(file.split('.')[0])
    vv = np.load(path + file)
    vvl.append(vv)

webcam = cv2.VideoCapture(0)
img_list = []
embedding_img_list = []
model_name = 'VGG-Face'
target_size = functions.find_target_size(model_name)

while webcam.isOpened() and not (cv2.waitKey(1) & 0xFF == ord('q')):
    status, frame = webcam.read()
    frame = cv2.flip(frame, 1)

    if status:
        try:
            result = DeepFace.extract_faces(img_path=frame, target_size=target_size, detector_backend='ssd', enforce_detection=False)
            face = result[0]['facial_area']
            x, y, w, h = face['x'], face['y'], face['w'], face['h']

            if x != 0 or y != 0:
                cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), 2)

                target_embedding = DeepFace.represent(img_path=frame[y:y + h, x:x + w], detector_backend='skip', enforce_detection=False)
                target_vector = target_embedding[0]['embedding']
                who = "Unknown"
                distance_list = []

                # 유사도 계산
                for vv in vvl:
                    distance = 1
                    for v in vv:
                        distance = min(distance, dst.findCosineDistance(target_vector, v))
                    distance_list.append(distance)

                # 가장 유사한 사람 선별
                distance = min(distance_list)
                if distance < 0.14:
                    who = name_list[distance_list.index(distance)]

                print(distance)

                confidence = 100 - int(distance * 170) if distance < 0.58 else 0
                cv2.putText(frame, str(confidence) + '%', (270, 70), cv2.FONT_HERSHEY_COMPLEX, 1, (250, 120, 255), 2)

                cv2.putText(frame, who, (240, 450), cv2.FONT_HERSHEY_COMPLEX, 1,
                            (0, 0, 255) if who == "Unknown" else (0, 255, 0), 2)
            else:
                cv2.putText(frame, "Face Not Found", (200, 450), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 0, 0), 2)
        except:
            cv2.putText(frame, "Face Not Found", (200, 450), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 0, 0), 2)

        cv2.imshow('Face Extractor', frame)

webcam.release()
cv2.destroyAllWindows()
