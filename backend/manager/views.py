from django.shortcuts import render

from rest_framework.views import APIView, Response
from rest_framework.request import Request
from signup.models import *
import json
# Create your views here.


class delete_menu (APIView):
    def get(self,request:Request):
        if request.method == 'GET':
            return Response("hello manager")
    def delete(self,request:Request):
        if request.method == 'DELETE' :
            data = request.query_params
            print(data)
            del_list = data.getlist('cart[]')
            print(del_list)
            del_result = []
            for ids in del_list:
                menu = Menu.objects.get(id=ids)
                del_result.append(menu.delete())
            
            return Response({'result'})