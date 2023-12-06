from django.shortcuts import render

from rest_framework.views import APIView, Response
from rest_framework.request import Request
from signup.models import *
from .serializers import *
from django.http import HttpResponse
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

class manage_category(APIView):
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
    def post(self,request:Request):
        if request.method == 'POST' :
            data = request.data
            new_category = data.get('category')
            new_cat = MenuCategory(new_category['menucategory_name'])
            new_cat.save()
            return HttpResponse(status = 200)
            
        
class manage_option(APIView):
    def get(self,request:Request):
        if request.method =='GET':
            option = Option.objects.all()
            option_list = []
            for opt in option:
                opt_dict = {}
                opt_dict['id'] = opt.id
                opt_dict['name'] =opt.option_name
                option_list.append(opt_dict)
                
        return Response({'option':option_list})
    def post(self,request:Request):
        if request.method == 'POST' :
            data = request.data
            new_option = data.get('option')
            new_opt = Option(option_name= new_option['option_name'], option_price = new_option['option_price'])
            new_opt.save()
            return HttpResponse(status = 200)

    
class manage_ingredient(APIView):
    def get(self,request:Request):
        if request.method =='GET':
            ingredient = Ingredient.objects.all()
            ingredient_list = []
            for ing in ingredient:
                ingr_dict = {}
                ingr_dict['id'] = ing.id
                ingr_dict['name'] = ing.ingredient_name
                ingredient_list.append(ingr_dict)
                
        return Response({'ingredient':ingredient_list})
    def post(self,request:Request):
        if request.method == 'POST' :
            data = request.data
            new_ingredient = data.get('option')
            new_ing = Ingredient(ingredient_name =new_ingredient)
            new_ing.save()
            return HttpResponse(status = 200)
    