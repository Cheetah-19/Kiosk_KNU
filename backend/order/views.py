from django.shortcuts import render
from . import views
from rest_framework.views import APIView
from rest_framework.response import Response
from .serialize import *

def test(request):
    return render(request,'test1.html',context={})

class MenulistView(APIView) :
    def get(self, request):
        menulist = Menu.objects.all()
        menu_category = MenuCategory.objects.all()
        menu_serializer = MenuSerializer(menulist,many=True)
        caterogy_serializer = MenuCaterogySerializer(menu_category,many=True)
        combined_data = {
            'menu_category':caterogy_serializer.data,
            'menulist':menu_serializer.data
        }
        return Response(combined_data)
