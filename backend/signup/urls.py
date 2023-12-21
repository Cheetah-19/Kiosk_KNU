from django.urls import path, include
from rest_framework import routers
from . import views

#DRF의 DefaultRouter를 활용해 MenuViewSet에 대한
#URL 패턴을 자동으로 생성
#라우터는 MenuVIewSet를 'menus'라는 기본 URL에 등록

# router = routers.DefaultRouter()
# router.register('menus', MenuViewSet)

#django의 URL 라우팅설정

app_name = 'kiosk_app'


urlpatterns = [
    path('', views.UserPost.as_view()),
    path('facecheck', views.FaceCheckView.as_view(), name='facecheck')
]

