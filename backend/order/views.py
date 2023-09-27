from django.shortcuts import render
from . import views
from rest_framework.views import APIView
from rest_framework.response import Response
from .serialize import *

def test(request):
    return render(request,'test1.html',context={})

class MenulistView(APIView) :
    def get(self, request):
        menus = Menu.objects.all()
        serializer = MenuSerializer(menus,many=True)
        return Response(serializer.data)
