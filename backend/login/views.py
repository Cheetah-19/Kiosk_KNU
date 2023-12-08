from rest_framework import permissions
from menu.serializers import *

from rest_framework.views import APIView
from rest_framework.response import Response

from face_recognition.face_identification import identification
from face_recognition.face_methods import *

import numpy as np


class LoginView(APIView):
    def post(self, request):
        phone_number = request.data.get('phone_number')

        if phone_number:
            is_phone_number_already_here = User.objects.filter(user_phonenum=phone_number).exists()
            if is_phone_number_already_here:
                # 이 경우에는 로그인 성공임
                return Response({'message': '로그인 성공.'})
            else:
                # 로그인 실패
                return Response({'message': '등록된 휴대폰 번호 정보가 없습니다.'}, status = 400)
        else:
            # 전화번호가 입력되지 않은 경우
            return Response({'message': '입력을 확인해 주세요.'}, status=400)


class FaceLoginView(APIView):
    '''
    얼굴 인식 로그인 작동 방식
    1. 프론트 Face.js를 통해 5장의 base64 파일 POST
    2. base64 -> image -> embedding
    3. 모든 user의 정보 불러오기
    4. 2번에서의 embedding과 user의 face info 거리 계산
    5. 거리가 임계값보다 낮고 최단 거리였던 user의 휴대폰 번호를 리턴
    '''
    def post(self,request):
        # 1. 프론트 Face.js를 통해 5장의 base64 파일 POST (list)
        if request.method == 'POST':
            try:
                face_bases = request.data.get('imageData')
            except:
                return Response('')

            # 2. base64 -> image -> embedding
            target_embedding_list = base_to_embedding(face_bases)
            print("Received face data from front")

            # 3. 모든 user의 정보 불러오기
            user_table = User.objects.all()

            min_dist = 1e9
            phonenum = None
            name = None

            for user in user_table:
                try:
                    user_face_list = np.array(eval(user.user_face_info))

                    # 4. 2번에서의 벡터와 user의 face info 거리 계산
                    distance = 1e9
                    for target in target_embedding_list:
                        distance = min(distance, identification(user_face_list, target))

                    print(f"{user.user_name}: {distance}")

                    if distance < min_dist:
                        min_dist = distance

                        # 거리가 임계값보다 낮을 때만 뽑음
                        if min_dist < 0.2:
                            phonenum = user.user_phonenum
                            name = user.user_name
                except:
                    pass

            if phonenum is not None:
                print(f"\nSuccess\nname: {name}, phonenum: {phonenum}")
            else:
                print("\nNone")

            # 5. 거리가 임계값보다 낮고 최단 거리였던 user의 휴대폰 번호를 리턴
            return Response({"phone_number": phonenum, "name": name})


class TestView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        return Response("Swagger 연동 테스트")
