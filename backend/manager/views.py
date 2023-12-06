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

class getcategory(APIView):
    def get(self,request:Request):    
        if request.method == 'GET':
            category = MenuCategory.objects.all()
            category_list = []
            for cate in category:
                cate_dict = {}
                cate_dict['id'] = cate.id
                cate_dict['menucategory_name'] =cate.menucategory_name
                category_list.append(cate_dict)
            
            return Response({'category':category_list})

class getoption(APIView):
    def get(self,request:Request):
        if request.method =='GET':
            option = Option.objects.all()
            option_list = []
            for opt in option:
                opt_dict = {}
                opt_dict['id'] = opt.id
                opt_dict['name'] =opt.option_name
                opt_dict['price'] = opt.option_price
                option_list.append(opt_dict)
                
        return Response({'option':option_list})