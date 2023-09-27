from django.urls import path, include
from rest_framework import routers
from . import views
from login.views import TestView

app_name = 'login'


urlpatterns = [
    path('', views.LoginPost, name='login'),
    #swagger
    # path('v1/test/', TestView.as_view(), name='test'),
    # path('', include(router.urls)),
    # path('', views.userform, name='userfrom'),
]