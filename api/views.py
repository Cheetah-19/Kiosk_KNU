from django.shortcuts import render, redirect

from django.contrib import messages

from api.models import *
# Create your views here.
from .serializers import MenuSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response

def index(request):
    
    return render(request, 'index.html')


def login(request):
    if request.method == 'POST':
        #post 로 입력한 전화번호 받아옴
        phone = request.POST['phone']
        # 데이터베이스와 비교
        try:

            user = User.objects.get(user_phonenum = phone)
        
            if user is not None:
                # login(request, user)
                return redirect('keyosk')
            
        except User.DoesNotExist:
            messages.error(request, '로그인에 실패했습니다.')
            return redirect('login')
    return render(request, 'login.html')

def keyosk(request):
    menu_list = Menu.objects.all()
    context = { 'menu_list' : menu_list}


    return render(request, 'keyosk.html', context)


@api_view(['POST'])
def create_menu(request):
    serializer = MenuSerializer(data=request.data)
    #직렬화가 유효한 경우 데이터 저장하고 생성된 객체의 직렬화 표현으로 응답 반환
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    #직렬화 불가능하면 에러를 포함한 응답 반환
    return Response(serializer.errors, status=400)