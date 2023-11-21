from django.shortcuts import render, redirect

# from django.contrib import messages

from signup.models import User, Menu, Vegetarian, Religion, Allergy
# Create your views here.
from .serializers import UserSerializer

# from rest_framework.decorators import api_view

from rest_framework.response import Response

from rest_framework import viewsets, generics

# from django.http import HttpResponse


# from django.http import HttpResponseRedirect
# from django.urls import reverse
# from django.views.generic.edit import FormView

from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response

# def kiosk(request):
#     menu_list = Menu.objects.all()
#     context = { 'menu_list' : menu_list}
#     if context.get('cart') != []:
#         context['cart'] = []
#     if request.method == 'POST':
#     #post 로 입력한 전화번호 받아옴
#         phone = request.POST['phone']
#         print(phone)
#     # 데이터베이스와 비교
#         try:

#             user = User.objects.get(user_phonenum = phone)
#             if user is not None:
#                 # login(request, user)
#                 context['user'] = user
#                 print(context)
#                 return render(request, 'kiosk.html',context)
                
            
#         except User.DoesNotExist:
#             messages.error(request, '로그인에 실패했습니다.')
#             return redirect('kiosk_app:login')
        
#     # elif request.method == 'GET': #비회원일때 guest로 사용
#     context['user'] = "Guest"
#     return render(request, 'kiosk.html', context)

# def guest_kiosk(request):   
#     return redirect('kiosk_app:kiosk')

# def show_option(request,id):
#     menu = Menu.objects.get(id = id)
#     menu_option = menu.menu_option.all()
#     context = {'options' : menu_option }
#     return render(request, 'option.html', context)

# def choice_complete(request,menu):
#     if request.method == 'POST':
#         selected_options = request.POST.getlist('option_checkbox')
#         print(selected_options)
        

#     return redirect('kiosk_app:kiosk')

#swagger 관련 API 코드 작성 Testing

class TestView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        return Response("Swagger 연동 테스트")
    
class UserPost(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer