import cv2
import numpy as np
from os import listdir
from os.path import isfile, join

face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
model = cv2.face.LBPHFaceRecognizer_create()
names = []

f = open('./id.txt', 'r')
file = f.readlines()
for context in file:
    names.append(context.split(' ')[1].rstrip('\n'))


# 모델 생성
def make_model():
    data_path = 'faces/'
    files = [f for f in listdir(data_path) if isfile(join(data_path, f))]
    Training_Data, Labels = [], []

    for file in files:
        image_path = data_path + file
        images = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)

        if images is None:
            continue

        Training_Data.append(np.asarray(images, dtype=np.uint8))
        Labels.append(int(file.split('_')[0]))

    if len(Labels) == 0:
        print("There is no data to train.")
        exit()

    Labels = np.asarray(Labels, dtype=np.int32)
    model.train(np.asarray(Training_Data), np.asarray(Labels))
    model.save("face_trainner.xml")

    print("Model Training Complete!!!!!")


# 얼굴 인식
if not isfile('./face_trainner.xml'):
    make_model()
else:
    model.read('face_trainner.xml')


def face_detector(img, size=0.5):
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)

    if len(faces) == 0:
        return img, []

    for (x, y, w, h) in faces:
        cv2.rectangle(img, (x, y), (x + w, y + h), (255, 0, 0), 2)
        roi = img[y:y + h, x:x + w]
        roi = cv2.resize(roi, (200, 200))

    return img, roi


webcam = cv2.VideoCapture(0)

if not webcam.isOpened():
    print("Could not open webcam")
    exit()


def generate_frame():
    while webcam.isOpened():
        ret, frame = webcam.read()
        frame = cv2.flip(frame, 1)

        if ret:
            # 얼굴 검출 시도
            image, face = face_detector(frame)
            try:
                face = cv2.cvtColor(face, cv2.COLOR_BGR2GRAY)
                result = model.predict(face)
                if result[1] < 500:
                    # 0~100 표시
                    confidence = int(100 * (1 - (result[1]) / 200))
                    # 유사도 화면에 표시
                    display_string = str(confidence) + '%'
                    cv2.putText(image, display_string, (270, 70), cv2.FONT_HERSHEY_COMPLEX, 1, (250, 120, 255), 2)
                # 75 보다 크면 동일 인물로 간주하여 UnLocked!
                if confidence > 75:
                    cv2.putText(image, names[result[0]], (250, 450), cv2.FONT_HERSHEY_COMPLEX, 1, (0, 255, 0), 2)
                    cv2.imshow('Face Detector', image)
                else:
                    # 75 이하면 타인으로 간주하여 Locked!
                    cv2.putText(image, "Unknown", (250, 450), cv2.FONT_HERSHEY_COMPLEX, 1, (0, 0, 255), 2)
                    cv2.imshow('Face Detector', image)
            except:
                # 얼굴 검출 안됨
                cv2.putText(image, "Face Not Found", (200, 450), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 0, 0), 2)
                cv2.imshow('Face Detector', image)
                pass

            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

    webcam.release()
    cv2.destroyAllWindows()


generate_frame()
