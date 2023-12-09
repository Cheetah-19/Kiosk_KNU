from deepface import DeepFace
from deepface.commons import functions
import cv2
import numpy as np


# recognizer
model_name = 'VGG-Face'
target_size = functions.find_target_size(model_name)


# 이미지 조명 제거
def homomorphic_filter(img):
    try:
        # YUV color space로 Y에 대한 연산만 진행
        img_YUV = cv2.cvtColor(img, cv2.COLOR_BGR2YUV)
        y = img_YUV[:, :, 0]

        rows = y.shape[0]
        cols = y.shape[1]

        # illumination elements와 reflectance elements를 분리하기 위해 log를 취함
        imgLog = np.log1p(np.array(y, dtype='float') / 255)

        M = 2 * rows + 1
        N = 2 * cols + 1

        # gaussian mask 생성 sigma = 10
        sigma = 10
        (X, Y) = np.meshgrid(np.linspace(0, N - 1, N), np.linspace(0, M - 1, M))
        Xc = np.ceil(N / 2)
        Yc = np.ceil(M / 2)
        gaussianNumerator = (X - Xc) ** 2 + (Y - Yc) ** 2

        # low pass filter와 high pass filter 생성
        LPF = np.exp(-gaussianNumerator / (2 * sigma * sigma))
        HPF = 1 - LPF

        LPF_shift = np.fft.ifftshift(LPF.copy())
        HPF_shift = np.fft.ifftshift(HPF.copy())

        # Log를 씌운 이미지를 FFT해서 LPF와 HPF를 곱해 LF성분과 HF성분을 나눔
        img_FFT = np.fft.fft2(imgLog.copy(), (M, N))
        img_LF = np.real(np.fft.ifft2(img_FFT.copy() * LPF_shift, (M, N)))
        img_HF = np.real(np.fft.ifft2(img_FFT.copy() * HPF_shift, (M, N)))

        # 각 LF, HF 성분에 scaling factor를 곱해주어 조명값과 반사값을 조절함
        gamma1 = 0.3
        gamma2 = 0.7
        img_adjusting = gamma1 * img_LF[0:rows, 0:cols] + gamma2 * img_HF[0:rows, 0:cols]

        # 조정된 데이터를 이제 exp 연산을 통해 이미지로 만들어줌
        img_exp = np.expm1(img_adjusting)
        img_exp = (img_exp - np.min(img_exp)) / (np.max(img_exp) - np.min(img_exp))
        img_out = np.array(255 * img_exp, dtype='uint8')

        # 마지막으로 YUV에서 Y space를 filtering된 이미지로 교체해주고 RGB space로 converting
        img_YUV[:, :, 0] = img_out
        result = cv2.cvtColor(img_YUV, cv2.COLOR_YUV2BGR)

        return result
    except:
        pass


# 이미지 크기를 모델 target_size로 조절
def resize_with_padding(image, target_size):
    height, width = image.shape[:2]
    target_height, target_width = target_size

    # 이미지 비율 계산
    aspect_ratio = width / height
    target_aspect_ratio = target_width / target_height

    # 이미지 비율에 따라 크기 조정
    if aspect_ratio > target_aspect_ratio:
        new_width = target_width
        new_height = int(new_width / aspect_ratio)
    else:
        new_height = target_height
        new_width = int(new_height * aspect_ratio)

    # 이미지 크기 조정
    resized_image = cv2.resize(image, (new_width, new_height))

    # 여백을 검은색으로 채우기
    padding_top = (target_height - new_height) // 2
    padding_bottom = target_height - new_height - padding_top
    padding_left = (target_width - new_width) // 2
    padding_right = target_width - new_width - padding_left
    padded_image = cv2.copyMakeBorder(resized_image, padding_top, padding_bottom, padding_left, padding_right, cv2.BORDER_CONSTANT, value=(0, 0, 0))

    return padded_image


'''
base64를 embedding으로 변환
1. base64 -> image
2. image -> face
3. face -> embedding
'''
def extractor(base64):
    # 1. base64 -> image
    

    try:
        img = functions.loadBase64Img(base64)
        # 2. image -> face (얼굴 영역 추출)
        face = DeepFace.extract_faces(img_path=img, target_size=target_size, detector_backend='ssd')[0]['facial_area']
        x, y, w, h = face['x'], face['y'], face['w'], face['h']
        face = img[y:y + h, x:x + w]

        # 조명 조정
        face = homomorphic_filter(face)

        # 이미지 크기 조정
        face = resize_with_padding(face, target_size)

        # 3. face -> embedding
        embedding_img = DeepFace.represent(img_path=face, model_name=model_name, detector_backend='skip')[0]['embedding']

        return embedding_img
    except:
        return None
