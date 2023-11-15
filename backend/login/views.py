from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import *
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
        
        #1. 프론트 face.js를 통해 n장의 base64파일 POST (list 형태로 10장 받음)
        if request.method == 'POST':
            try:
                face_bases = request.data.get('imageData')
            except:
                return Response('')
            input_vector_list = []
            for base in face_bases: #2. 리스트 안의 base64들을 벡터로 변환
                input_vector = extractor(base) # base64 -> vector (extractor)
                if input_vector != None:
                    input_vector_list.append(input_vector)
            print("Received face data from front")
            user_table = User.objects.all() # 3.user의 모든 face data 불러오기
            candidate_logins = {}
            for inputs in input_vector_list:
                login_id = ''
                min_distance = 1e9
                for user in user_table:
                    if user.user_face_info == None:
                        continue
                    else:
                        user_face_list = eval(user.user_face_info) #str로 저장되어있는 리스트를 list로 변환 ->[[d1,d2,...,d512],[d1,d2,...,d512],...]
                        for user_faces in user_face_list:   #db에 있는 유저의 모든 얼굴정보 벡터와 인풋의 벡터 길이 측정
                            try:
                                distance = identification(inputs,user_faces)    #최솟값 추출
                                if distance != None:
                                    if min_distance > distance:
                                        min_distance = distance
                                        login_id = user.id
                                        mininum_vector = user_faces
                            except Exception as e:
                                pass
                if login_id != '':
                    print("candidate is {}".format(login_id))       
                #10개의 인풋에 대한 후보 유저를 딕셔너리에 벡터값과 같이 등록
                #db에 유저 얼굴 벡터에 대한 데이터셋을 추가시켜 얼굴인식 정확도를 높이는데 기여함
                if candidate_logins.get(login_id) == None:
                    candidate_logins[login_id] = [mininum_vector]
                else:
                    candidate_logins[login_id].append(mininum_vector)
            #10개의 인풋으로 나온 후보 회원중 가장 많이 나온 회원을 로그인한 회원으로 간주
            login_candidates = -1
            candidate = User()
            for candi in candidate_logins.keys():
                candi_counts = len(candidate_logins[candi])
                if login_candidates <= candi_counts:
                    candidate = User.objects.get(id = candi)
                    login_candidates = candi_counts
            login_user = candidate
            print("login is {}".format(login_user.user_name))
            #로그인한 회원의 user_face_info에 리스트로서 candidate_logins에 들어간 벡터값들을 추가시킴
            #db에 유저 얼굴 벡터에 대한 데이터셋을 추가시켜 얼굴인식 정확도를 높이는데 기여함
            #일단은 주석처리 해놓음 -> 너무 많이 저장될까봐(시간복잡도에 대한 고민을 해 볼 필요가 있어보임)
            # for vector in candidate_logins[login_user.id]:
            #     login_user_face = User.objects.get(id=login_user.id).user_face_info
            #     login_user_face_list = eval(login_user_face)
            #     login_user_face_list.append(vector)
            #     login_user.user_face_info = str(login_user_face_list)
            #     login_user.save()
            return Response({"phone_number":login_user.user_phonenum})
        
            
    



class TestView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        return Response("Swagger 연동 테스트")
