from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from menu.serializers import *

from rest_framework.views import APIView
from rest_framework.response import Response

from .face_recognition.face_extractor import extractor
from .face_recognition.face_identification import identification

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
    1. 프론트 face.js를 통해 n장의 base64파일 POST
    2. base64 -> vector (extractor)
    3. user의 모든 face data 불러오기
    4. user의 모든 facedata와 2에서 생성한 vector의 거리 계산
    5. 최단 거리인 user id 리턴
    '''
    
    #회원가입 시 필요한 코드 
    # base64 -> vector -> str  코드 
    # user의 user_face_info에 vector_str 저장
    '''
    with open('base64.txt','r') as b64f:
        basestr = b64f.readline()
    vector= extractor(basestr) #vector 
    vector_str=''
    for v in vector:
        vector_str += str(v)+'/'
    vector_str = vector_str.rstrip('/')
    '''
    def post(self,request):
        
        #1. 프론트 face.js를 통해 n장의 base64파일 POST
        if request.method == 'POST':
            try:
                face_bases = request.data.get('imageData')
            except:
                return Response('')
            input_vector = extractor(face_bases) #2. base64 -> vector (extractor)
            user_table = User.objects.all() # 3.user의 모든 face data 불러오기
            # 4. user의 모든 facedata와 2에서 생성한 vector의 거리 계산
            # 5. 최단 거리인 user id 리턴
            login_distance = 1e9
            login_userid = ''
            login_username = ''
            for user in user_table:
                user_id = user.id
                user_name = user.user_name
                user_face = user.user_face_info
                try :
                    # print(user_face)
                    user_face = user_face.strip("'")
                    user_face_list = user_face.split('/')
                    # print('success {}'.format(len(user_face_list)) )
                    user_face_vector = [float(dim) for dim in user_face_list]
                    # print(len(user_face_vector))
                    db_user_distance = identification(input_vector,user_face_vector)
                    print('({}.{}) distance: {}'.format(user_id,user_name,db_user_distance))
                    if db_user_distance < login_distance:
                        login_distance = db_user_distance
                        login_userid = user_id
                        login_username = user_name
                except Exception as e:
                    # print('{} is {}'.format(user_name,e))
                    pass
            print('login is {}'.format(login_username))
            
            
            return Response('')
            

        
        
        
        
        
    
       
        
        
        


    
    
    



class TestView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        return Response("Swagger 연동 테스트")
