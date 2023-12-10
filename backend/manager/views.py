from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView, Response
from rest_framework.request import Request
from signup.models import *
from .serializers import *
from django.http import HttpResponse
from rest_framework.parsers import MultiPartParser

class manage_menu (APIView):
    #현재 있는 메뉴 수정
    def post(self,request:Request):  
        if request.method == 'POST':
            data = request.data
            menu_id = data['menu_id']
            menu_opt = data['option_id']
            cur_menu = Menu.objects.get(id = menu_id)
            cur_menu.menu_option.remove(Option.objects.get(id=menu_opt))
            cur_menu.save()
            return Response(MenuSerializer(cur_menu).data,status=status.HTTP_202_ACCEPTED)
            
         
    def delete(self,request:Request):
        if request.method == 'DELETE' :
            data = request.query_params
            del_list = data.getlist('cart[]')
            del_result = []
            for ids in del_list:
                menu = Menu.objects.get(id=ids)
                del_result.append(menu.delete())
            
            return Response({'result':del_result},status=status.HTTP_202_ACCEPTED)

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
            
            return Response({'category':category_list},status=status.HTTP_200_OK) 
    def post(self,request:Request):
        if request.method == 'POST' :
            data = request.data
            print(data)
            new_category = data.get('category')
            new_cat = MenuCategory(menucategory_name=new_category['menucategory_name'])
            new_cat.save()
            return Response(MenuCategorySerializer(new_cat).data,status=status.HTTP_201_CREATED)
    def delete(self,request:Request):
        if request.method == 'DELETE':
            data = request.query_params
            del_cats = data.getlist('category[]')
            for cat in del_cats:
                del_result = MenuCategory.objects.get(id=cat).delete()
                
            return Response(status=status.HTTP_202_ACCEPTED)
        
            
            
        
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
                
        return Response({'option':option_list},status=status.HTTP_200_OK)
    def post(self,request:Request):
        if request.method == 'POST' :
            data = request.data
            new_option = data.get('option')
            new_opt = Option(option_name= new_option['option_name'], option_price = new_option['option_price'], optioncategory = OptionCategory.objects.get(optioncategory_name = "Something"))
            new_opt.save()
            return Response(OptionSerializer(new_opt).data,status=status.HTTP_201_CREATED)
    def delete(self,request:Request):
        if request.method == 'DELETE':
            data = request.query_params
            del_options = data.getlist('options[]')
            for opts in del_options:
                del_result = Option.objects.get(id=opts).delete()
                
            return Response(status=status.HTTP_202_ACCEPTED)
            
    
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
                
        return Response({'ingredient':ingredient_list},status=status.HTTP_200_OK)
    def post(self,request:Request):
        if request.method == 'POST' :
            data = request.data
            new_ingredient = data.get('ingredient')
            new_ing = Ingredient(ingredient_name =new_ingredient['ingredient_name'])
            new_ing.save()
            return Response(IngredientSerializer(new_ing).data,status=status.HTTP_201_CREATED)
    
class add_menu(APIView):
    def post(self,request:Request):
        #For receiving image from request
        parser_class = (MultiPartParser,)
        if request.method == 'POST':
            data = request.data.copy()
            data._mutable = True
            json_data = {}
            json_data['menucategory'] = int(data['menucategory'])
            json_data['menu_ingredient'] = [ int(i) for i in data['menu_ingredient'].split(',')]
            json_data['menu_price'] = int(data['menu_price'])
            json_data['menu_option'] = [int(i) for i in data['menu_option'].split(',')]
            json_data['menu_name'] = data['menu_name']
            json_data['menu_introduction'] = data['menu_introduction']
            
            try:
                json_data['menu_pic'] =  request.FILES['menu_pic']
            except Exception as e:
                print(e)
                json_data['menu_pic'] = None
            menu_serial = MenuSerializer(data=json_data) 
            if menu_serial.is_valid(raise_exception=True) :
                menu_serial.save()
                return Response(menu_serial.data,status=status.HTTP_201_CREATED)
            return Response(menu_serial.errors, status=status.HTTP_400_BAD_REQUEST)
