from django.urls import path
from . import views


#django의 URL 라우팅설정

urlpatterns = [
    path('', views.index, name='index'),
    path('log_in/', views.login, name='login'),
    path('keyosk/', views.keyosk, name = 'keyosk'),
    path('non_member/keyosk/', views.keyosk, name = 'keyosk_nonmem'),
]

