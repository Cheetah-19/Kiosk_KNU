from django.shortcuts import render
from login.models import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response



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




class TestView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        return Response("Swagger 연동 테스트")
