from deepface import DeepFace
import cv2
import numpy as np
from deepface.commons import functions

webcam = cv2.VideoCapture(0)
delay = 0  # 촬영 속도
count = 0  # 촬영 장수
img_list = []
embedding_img_list = []
model_name = 'VGG-Face'  # recognizer은 VG-Face 사용
target_size = functions.find_target_size(model_name)
name = input()

while webcam.isOpened() and not (cv2.waitKey(1) & 0xFF == ord('q')) and count < 5:
    status, frame = webcam.read()
    frame = cv2.flip(frame, 1)

    if status:
        try:
            # detector은 ssd 사용
            result = DeepFace.extract_faces(img_path=frame, target_size=target_size, detector_backend='ssd', enforce_detection=False)
            face = result[0]['facial_area']
            x, y, w, h = face['x'], face['y'], face['w'], face['h']

            if x != 0 or y != 0:
                cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), 2)
                delay += 1
                if delay == 40:
                    img_list.append(frame[y:y + h, x:x + w])
                    count += 1
                    delay = 0
            else:
                cv2.putText(frame, "Face Not Found", (200, 450), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 0, 0), 2)
                delay = 0
        except:
            cv2.putText(frame, "Face Not Found", (200, 450), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 0, 0), 2)
            delay = 0

        cv2.putText(frame, str(count), (550, 70), cv2.FONT_HERSHEY_COMPLEX, 1, (0, 0, 0), 2)
        cv2.imshow('Face Extractor', frame)

webcam.release()
cv2.destroyAllWindows()

for img in img_list:
    embedding_img = DeepFace.represent(img_path=img, model_name=model_name, detector_backend='skip',  enforce_detection=False)
    embedding_img_list.append(embedding_img[0]['embedding'])

embedding_vector = np.array(embedding_img_list)
np.save('./db/' + name + '.npy', embedding_vector)
