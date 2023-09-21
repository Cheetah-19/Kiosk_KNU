from django.shortcuts import render, redirect

from django.contrib import messages

from api.models import *
# Create your views here.
from .serializers import MenuSerializer

from rest_framework.decorators import api_view

from rest_framework.response import Response

from rest_framework import viewsets

<<<<<<< HEAD
user = User()
user.cart.cart = list()
user.user_phonenum = "123456789"
user.cart.userid = user.user_phonenum
=======
from django.http import HttpResponse

from django.http import HttpResponseRedirect
from django.urls import reverse

>>>>>>> 403e7478cc108363b160cb975ae595d850399b60
def userform(request):

    vegan_list = Vegetarian.objects.all()
    region_list = Region.objects.all()
    allergy_list = Allergy.objects.all()

    context = {
        'vegan_list': vegan_list,
        'region_list': region_list,
        'allergy_list': allergy_list,
    }

    return render(request, 'userform.html', context)

<<<<<<< HEAD
# def register(request):

# def result(request):
=======
def register(request):
    if request.method == 'POST':
        phone_number = request.POST.get('phone_number')
        username = request.POST.get('username')
        vegan_type = request.POST.get('vegan_type')
        religion = request.POST.get('religion')
        #checkbox 로부터 받아온 여러 값 처리 ..
        allergies = request.POST.getlist('allergies')


    # 사용자의 userform 에서 받아온 전화번호/이름이 기존의 데이터베이스에 있는지 확인하기
        if User.objects.filter(phone_number=phone_number).exists() or User.objects.filter(username=username).exists():
            return render(request, 'userform.html', {
                'error_message' : "이미 등록된 사용자입니다."
            })
        # 둘 다 기존 데이터베이스와 다른 것이 확인되었다면, 
        # 모든 정보 Database 에 등록 실시하기
        # 일단 나머지 정보도 가져오기
        else:
            user = User(phone_number=phone_number, username=username)
            # 유효성 검사 후 저장 
            user.full_clean()
            user.save()

            return HttpResponseRedirect(reverse('user:result'))
        
def result(request):
>>>>>>> 403e7478cc108363b160cb975ae595d850399b60

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


def kiosk(request):
    print(user.user_phonenum)
    print(user.cart.cart)
    menu_list = Menu.objects.all()
    context = { 'menu_list' : menu_list}
    return render(request, 'kiosk.html', context)

def show_option(request,id):
    menu = Menu.objects.get(id = id)
    menu_option = menu.menu_option.all()
    context = {'options' : menu_option }
    return render(request, 'option.html', context)

def choice_complete(request,menu):
    user.cart.addItem(Menu.objects.get(id = menu))
    print(user.cart.cart)
    return redirect('/menu/kiosk')

# class optionView(FormView):
    
#     template_name = "option.html"
#     form_class = optionForm
#     success_url = 'keyosk.html'
#     def get_context():
#         menu_list = Menu.objects.all()
#         context = {'menu_list' : menu_list, 'cart':user.cart.cart}
#         return context
#     def form_valid(self, form: Any) -> HttpResponse:
#         menu = form.cleaned_data("option1")
#         return super().form_valid(form)
    

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