from django.urls import path, include
from rest_framework import routers
from . import views
from .views import MenuViewSet 

from signup.views import TestView
#DRF의 DefaultRouter를 활용해 MenuViewSet에 대한
#URL 패턴을 자동으로 생성
#라우터는 MenuVIewSet를 'menus'라는 기본 URL에 등록

router = routers.DefaultRouter()
router.register('menus', MenuViewSet)

#django의 URL 라우팅설정

app_name = 'kiosk_app'


urlpatterns = [
    path('', views.UserPost.as_view()),
    #swagger
    path('v1/test/', TestView.as_view(), name='test'),
    # path('', include(router.urls)),
    # path('', views.userform, name='userfrom'),
    # path('register/', views.register, name='register'),
    # path('result/', views.result, name='result'),
    # path('', views.index, name='index'),
    # path('index/',views.index,name='index'),
    # path('create_menu/', views.create_menu, name='create_menu'),
    # path('kiosk/', views.kiosk, name = 'kiosk'),
    # path('index/login/',views.login,name='login'),
    # path('index/kiosk/', views.guest_kiosk, name = 'guest_kiosk'),
    # path('index/login/kiosk/',views.kiosk, name = 'member_kiosk'),
    # path('kiosk/<id>/option/',views.show_option,name='option'),
    # path('kiosk/<menu>/option/kiosk',views.choice_complete,name='choice_complete')
    

]

