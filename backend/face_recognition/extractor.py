import cv2

face_classifier = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')


def face_extractor(img):
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_classifier.detectMultiScale(gray, 1.3, 5)

    if len(faces) == 0:
        return None

    for (x, y, w, h) in faces:
        cropped_face = img[y:y + h, x:x + w]

    return cropped_face


webcam = cv2.VideoCapture(0)
count = 0

# 다음 id 찾기
f_read = open('./id.txt', 'rt')
try:
    id = int(f_read.readlines()[-1].split(' ')[0]) + 1
except:
    id = 0
f_read.close()

name = input()

# DB 대신 파일에 id와 이름 기록
f_write = open('./id.txt', 'at')
f_write.write(str(id) + ' ' + name + '\n')
f_write.close()

while True:
    ret, frame = webcam.read()
    frame = cv2.flip(frame, 1)

    if ret:
        if face_extractor(frame) is not None:
            count += 1
            face = cv2.resize(face_extractor(frame), (200, 200))
            face = cv2.cvtColor(face, cv2.COLOR_BGR2GRAY)

            file_name_path = 'faces/' + str(id) + '_' + name + '_' + str(count) + '.jpg'
            cv2.imwrite(file_name_path, face)

            cv2.putText(face, str(count), (50, 50), cv2.FONT_HERSHEY_COMPLEX, 1, (0, 255, 0), 2)
            cv2.imshow('Face Extractor', face)
        else:
            print("Face not Found")
            pass

        if cv2.waitKey(1) == 13 or count == 200:
            break

webcam.release()
cv2.destroyAllWindows()

print('Colleting Samples Complete!!!')
