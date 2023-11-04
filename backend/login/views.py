from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from menu.serializers import *

from rest_framework.views import APIView
from rest_framework.response import Response


class LoginView(APIView):
    def post(self, request):
        phone_number = request.data.get('user_phonenum')

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





class TestView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        return Response("Swagger 연동 테스트")
