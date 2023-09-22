from django.shortcuts import render, redirect

from django.contrib import messages

from api.models import *
# Create your views here.
from .serializers import MenuSerializer

from rest_framework.decorators import api_view

from rest_framework.response import Response

from rest_framework import viewsets

from django.http import HttpResponse

from django.http import HttpResponseRedirect
from django.urls import reverse



def userform(request):

    vegan_list = Vegetarian.objects.all()
    religion_list = Religion.objects.all()
    allergy_list = Allergy.objects.all()

    context = {
        'vegan_list': vegan_list,
        'religion_list': religion_list,
        'allergy_list': allergy_list,
    }

    return render(request, 'userform.html', context)

def register(request):
    if request.method == 'POST':
        phone_number = request.POST.get('phone_number')
        username = request.POST.get('user_name')


    # 사용자의 userform 에서 받아온 전화번호/이름이 기존의 데이터베이스에 있는지 확인하기
        if User.objects.filter(user_phonenum == phone_number).exists() or User.objects.filter(user_name == username).exists():
            return HttpResponse('이미 등록된 사용자.')
        # 둘 다 기존 데이터베이스와 다른 것이 확인되었다면, 
        # 모든 정보 Database 에 등록 실시하기
        # 일단 나머지 정보도 가져오기
        else:
        #     print("hello")
        #     vegan_type_names = request.POST.getlist('vegan_type')  
        # # religion_names = request.POST.get('Religion')  
        #     religion_name = request.POST.get('religion') 
        #     allergy_names = request.POST.getlist('allergy_name')  


        #     for name in vegan_type_names:
        #         vegan_type = Vegetarian.objects.get(vegetarian_name=name) 
        #         User.user_vegetarian.add(vegan_type) 

        #     # religion = User.objects.get(name=religion_name) 
        #     # User.religion = religion  # 'religion'는 User 모델에서 ForeignKey로 정의한 속성 이름이어야 함

        #     for name in allergy_names:
        #         allergy = Allergy.objects.get(allergy_name=name)
        #         User.user_allergy.add(allergy)  



            user = User(phone_number=phone_number, username=username)
            # 유효성 검사 후 저장 
            user.full_clean()
            user.save()

            return HttpResponseRedirect(reverse('user/result'))


    else:
	    return HttpResponse('Invalid request method.')

        
def result(request):

    return render(request, 'result.html')

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


#menu create 해보는 연습 (Json으로)
@api_view(['POST']) #POST HTTP Method 에 대한 요청만 처리하도록 지정. 다른 요청이 들어오면 자동으로 405 응답반환.
def create_menu(request):
    serializer = MenuSerializer(data=request.data)
    #직렬화가 유효한 경우 데이터 저장하고 생성된 객체의 직렬화 표현으로 응답 반환
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    #직렬화 불가능하면 에러를 포함한 응답 반환
    return Response(serializer.errors, status=400)


# Menu 모델을 위한 ViewSet Class

class MenuViewSet(viewsets.ModelViewSet):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer