from django.shortcuts import render
from login.models import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .face_recognition.face_extractor import extractor

def LoginPost(request):
    if request.method == 'POST':
        name = request.POST.get('user_name')
        phone_number = request.POST.get('user_phonenum')

        if phone_number and name:
            is_phone_number_already_here = User.objects.filter(user_phonenum=phone_number).exists()
            is_name_already_here = User.objects.filter(user_name=name).exists()
            if is_phone_number_already_here or is_name_already_here:
                # 이미 등록된 사용자인 경우
                return Response({'message': '이미 등록된 사용자입니다. 다시 로그인해주세요.'}, status=400)
            else:
                # 새로운 사용자인 경우
                return Response({'message': '로그인이 승인되었습니다.'})
        else:
            # 전화번호 또는 이름이 입력되지 않은 경우
            return Response({'message': '입력을 확인해 주세요.'}, status=400)


def FaceLoginView(request):
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
    
    '''
    #1. 프론트 face.js를 통해 n장의 base64파일 POST
    if request.method == 'POST':
        code for post from front
    '''
    
    '''
    #2. base64 -> vector (extractor)
    
    '''
   
    # 3.user의 모든 face data 불러오기
    face_dict = get_face_dict()
    
    # 4. user의 모든 facedata와 2에서 생성한 vector의 거리 계산
    # 5. 최단 거리인 user id 리턴
    
    return Response({'message':'face recognition'})
    
    
    
    
    


class TestView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        return Response("Swagger 연동 테스트")


def get_face_dict():
    facelist = {}
    user_table = User.objects.all()
    for user in user_table:
        user_name = user.id
        user_face = user.user_face_info
        try : 
            user_face_vector = user_face.split('/')
            facelist[user_name] = user_face_vector
        except:
            pass
        
    for keys in facelist.keys():
        print(keys)
        print(facelist[keys][0])
    return facelist