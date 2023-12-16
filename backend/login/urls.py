from django.urls import path, include
from rest_framework import routers
from . import views


app_name = 'login'

urlpatterns = [
    path('', views.LoginView.as_view(), name='login'),
    path('face/',views.FaceLoginView.as_view(),name ='face'),
]