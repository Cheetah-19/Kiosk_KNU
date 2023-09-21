from django.urls import path, include
from rest_framework import routers
from . import views
from .views import MenuViewSet 

#DRF의 DefaultRouter를 활용해 MenuViewSet에 대한
#URL 패턴을 자동으로 생성
#라우터는 MenuVIewSet를 'menus'라는 기본 URL에 등록

router = routers.DefaultRouter()
router.register('menus', MenuViewSet)

#django의 URL 라우팅설정

urlpatterns = [
    # path('', include(router.urls)),
    path('', views.userform, name='userfrom'),
    path('register/', views.register, name='register'),
    path('result/', views.result, name='result'),
    # path('', views.index, name='index'),
    # path('log_in/', views.login, name='login'),
    # path('keyosk/', views.keyosk, name = 'keyosk'),
    # path('non_member/keyosk/', views.keyosk, name = 'keyosk_nonmem'),
    path('create_menu/', views.create_menu, name='create_menu'),

]

