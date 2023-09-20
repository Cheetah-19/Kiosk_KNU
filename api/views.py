from django.shortcuts import render, redirect

from django.contrib import messages

from api.models import *
# Create your views here.


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