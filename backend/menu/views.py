from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import *
from django.http import HttpResponse
import json

class MenulistView(APIView): #메뉴 리스트 출력 (일단은 비회원 전제, 유저 데이터를 받으면 수정예정)
    def get(self, request):
        menulist={}
        menu_category = MenuCategory.objects.all() #메뉴 리스트 전체
        menulist['categories'] = []  #메뉴 카테고리를 저장하기 위한 리스트
        for category in menu_category:                                                      
            category_menu = Menu.objects.filter(menucategory = category.id)                 #카테고리에 해당되는 메뉴들 가져오기
            if category_menu.count() != 0 :                                                 #해당 카테고리에 하나라도 있을 때 :카테고리만 있고 메뉴는 하나도 없으면 추가하지 않음
                menulist['categories'].append(MenuCategorySerializer(category).data)        #메뉴 카테고리 리스트에 추가()
                menu_serializer = MenuSerializer(category_menu,many=True)                   #카테고리에 해당하는 메뉴들을 json화 
                menulist['{}'.format(category.menucategory_name)] = menu_serializer.data    #메뉴 카테고리 이름 key, serialized data 를 value로 추가
            
        return Response(menulist)


class OptionView(APIView):
    # def get(self,request,id):
    def get(self,request):
        optionlist = {}
        option_category = OptionCategory.objects.all()                                          #옵션 카테고리 전체
        optionlist['categories'] = []                                                           #옵션 카테고리들을 넣어놓을 리스트
        for category in option_category:                                                        #선택한 메뉴(id)에 하나라도 옵션 카테고리에 해당하는게 있을 경우
            options = Option.objects.filter(optioncategory=category.id)
            #options = Menu.objects.get(id=id).menu_option.filter(optioncategory = category.id)  #선택한 메뉴에 있는 옵션들 중 카테고리에 해당되는 옵션들만 가져오기 
            if options.count() != 0 :                                                           #해당되는 옵션이 하나도 존재하지 않는 카테고리는 프론트에 보낼 정보에 포함되지 않음.
                optionlist['categories'].append(OptionCategorySerializer(category).data)        #옵션 카테고리 리스트에 추가
                option_serializer = OptionSerializer(options,many=True)                         
                optionlist['{}'.format(category.optioncategory_name)] = option_serializer.data  #옵션 카테고리 이름 key, serialized data를 value로 추가 

        return Response(optionlist)
    
class InsertMenuView(APIView):
    def get(self,requeset): 
        return HttpResponse("get 받으면 뭐할지 안정했다. postman을 이용해 post 시켜보자")
    def post(self,request):
        posted = json.loads(request.body)
        new_menu = Menu()
        new_menu.menu_name = posted["menu_name"]
        new_menu.menu_pic = posted["menu_pic"]
        new_menu.menu_price = posted["menu_price"]
        new_menu.menu_introduction = posted["menu_introduction"]
        new_menu.menucategory = MenuCategory.objects.get(id=posted["menucategory"])
        new_menu.save() #새로 생성할 Menu의 pk값을 생성해야 manytomany 연결이 가능하므로 저장 후 manytomany 연결
        new_menu.menu_ingredient.add(*posted["menu_ingredient"])
        new_menu.menu_option.add(*posted["menu_option"])
       
        return MenulistView().get(request=request)
    
class InsertMenuOptionView(APIView):
    def get(self,requeset): 
        return HttpResponse("get 받으면 뭐할지 안정했다. postman을 이용해 post 시켜보자")
    def post(self,request):
        posted = json.loads(request.body)
        new_option = Option()
        new_option.option_name = posted["option_name"]
        new_option.option_price = posted["option_price"]
        new_option.option_pic = ""
        new_option.option_introduction = posted["option_introduction"]
        new_option.save() #새로 생성할 optino의 pk값이 있어야 category 연결이 가능하므로 저장 후 manytomany 연결
        new_option.optioncategory = OptionCategory.objects.get(id=posted["optioncategory"])
        
        return OptionView().get(request=request)
    
#category는 해당 카테고리에 아무것도 없으면 카테고리리스트에 반환하지 않게 설정해놔서
#카테고리를 생성하면 당장에는 빈 카테고리이므로 json에 보이지는 않는다.
#이 또한 원한다면 수정 가능
class InsertMenuCategoryView(APIView):
    def get(self,requeset): 
        return HttpResponse("get 받으면 뭐할지 안정했다. postman을 이용해 post 시켜보자")
    def post(self,request):
        posted = json.loads(request.body)
        new_menucategory = MenuCategory(menucategory_name = posted['menucategory_name'])
        new_menucategory.save()
        return MenulistView().get(request=request)
        
class InsertOptionCategoryView(APIView):
    def get(self,requeset): 
        return HttpResponse("get 받으면 뭐할지 안정했다. postman을 이용해 post 시켜보자")
    def post(self,request):
        posted = json.loads(request.body)
        new_optioncategory = OptionCategory(optioncategory_name = posted['optioncategory_name'])
        new_optioncategory.save()
        return OptionView().get(request=request)
    
    
    # {
    #     "option_name":"Add Mountain_Dew",
    #     "option_price":1000,
    #     "option_pic":"",
    #     "option_introduction":"초록을머금은음료",
    #     "optioncategory":2
    # }
    
    # {
    #     "menu_name":"newm1",
    #     "menu_pic":"",
    #     "menu_price":5550,
    #     "menu_introduction":"이것은 신메뉴다.",
    #     "menu_ingredient":[
    #         1,
    #         2
    #     ],
    #     "menu_option":[
    #         3,
    #         4
    #     ],
    #     "menucategory":1
    # }
    
    # {
    #     "menucategory_name":"국밥"
    # }
    # {
    #     "optioncategory_name":"Alcohol"
    # }