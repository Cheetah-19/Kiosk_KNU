from django.shortcuts import render, redirect

from django.contrib import messages

from api.models import User, Menu, Vegetarian, Religion, Allergy
# Create your views here.
from .serializers import MenuSerializer

from rest_framework.decorators import api_view

from rest_framework.response import Response

from rest_framework import viewsets

from django.http import HttpResponse


from django.http import HttpResponseRedirect
from django.urls import reverse
from django.views.generic.edit import FormView



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

@api_view(['POST'])
def register(request):
    phone_number = str(request.POST.get('phone_number'))
    username = str(request.POST.get('user_name'))


    print(phone_number)
    print(username)

    
    is_phone_number_already_here = User.objects.filter(user_phonenum = phone_number).exists() 
    is_name_already_here = User.objects.filter(user_name = username).exists()

    # 사용자의 userform 에서 받아온 전화번호/이름이 기존의 데이터베이스에 있는지 확인하기
    if is_phone_number_already_here or is_name_already_here:
        return HttpResponse('이미 등록된 사용자.')

    else:
        user = User(user_phonenum=phone_number, user_name=username)
        # 유효성 검사 후 저장 
        user.full_clean()
        user.save()

        return HttpResponseRedirect(reverse('result'))
    



        
def result(request):

    return render(request, 'result.html')


def index(request):
    
    return render(request, 'index.html')


def login(request):
    # post로 유저 phone_number를 전달하기 메뉴 선택에 반영하기 위함
    
    # if request.method == 'POST':
    #     #post 로 입력한 전화번호 받아옴
    #     phone = request.POST['phone']
    #     # 데이터베이스와 비교
    #     try:

    #         user = User.objects.get(user_phonenum = phone)
        
    #         if user is not None:
    #             # login(request, user)
    #             return redirect('kiosk')
            
    #     except User.DoesNotExist:
    #         messages.error(request, '로그인에 실패했습니다.')
    #         return redirect('login')
    return render(request, 'login.html')

def kiosk(request):
    menu_list = Menu.objects.all()
    context = { 'menu_list' : menu_list}
    if context.get('cart') != []:
        context['cart'] = []
    if request.method == 'POST':
    #post 로 입력한 전화번호 받아옴
        phone = request.POST['phone']
        print(phone)
    # 데이터베이스와 비교
        try:

            user = User.objects.get(user_phonenum = phone)
            if user is not None:
                # login(request, user)
                context['user'] = user
                print(context)
                return render(request, 'kiosk.html',context)
                
            
        except User.DoesNotExist:
            messages.error(request, '로그인에 실패했습니다.')
            return redirect('kiosk_app:login')
        
    # elif request.method == 'GET': #비회원일때 guest로 사용
    context['user'] = "Guest"
    return render(request, 'kiosk.html', context)

def guest_kiosk(request):   
    return redirect('kiosk_app:kiosk')

def show_option(request,id):
    menu = Menu.objects.get(id = id)
    menu_option = menu.menu_option.all()
    context = {'options' : menu_option }
    return render(request, 'option.html', context)

def choice_complete(request,menu):
    if request.method == 'POST':
        selected_options = request.POST.getlist('option_checkbox')
        print(selected_options)
        

    return redirect('kiosk_app:kiosk')

# class optionView(FormView):
#     template_name = "option.html"
#     form_class = OptionForm
#     success_url = '/kiosk'
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