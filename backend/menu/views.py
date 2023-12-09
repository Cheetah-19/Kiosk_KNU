from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import *
from signup.models import User, Menu, Order, Ordered_Item, PreprocessedData 
from django.http import HttpResponse
import json

class member_MenulistView(APIView): # 회원 메뉴 리스트 출력 
    def get(self, request, userphonenum):
        #이미 DB에 있는 회원인게 검증되었기 떄문에 검증과정이 필요없다
        UserGetter = User.objects.get(user_phonenum = userphonenum)     #전화번호를 통해 user데이터 불러오기
        exclude_ingredient = set()                                      #회원 필터링을 위해 제외할 재료를 저장해 둘 set 

        try:
            preprocessed_data = PreprocessedData.objects.get(user=UserGetter)
            exclude_ingredient_str = preprocessed_data.excluded_ingredients
        except PreprocessedData.DoesNotExist:
            exclude_ingredient_str = ""

        #String 을 Set 으로 변경하는 과정
        # 중괄호 제거 후 쉼표로 분할
        exclude_ingredient_list = exclude_ingredient_str[1:-1].split(',')
        #문자열 -> 정수 변환 후 set 제작
        exclude_ingredient_set = set(int(item.strip()) for item in exclude_ingredient_list)

        menulist={}
        menu_category = MenuCategory.objects.all() #메뉴 리스트 전체
        menulist['categories'] = []  #메뉴 카테고리를 저장하기 위한 리스트
        for category in menu_category:                                                      
            category_menu = Menu.objects.filter(menucategory = category.id)                 #카테고리에 해당되는 메뉴들 가져오기
            if category_menu.count() != 0 :                                                 #해당 카테고리에 하나라도 있을 때 :카테고리만 있고 메뉴는 하나도 없으면 추가하지 않음
                menulist['categories'].append(MenuCategorySerializer(category).data)        #메뉴 카테고리 리스트에 추가()
                menu_serializer = MenuSerializer(category_menu,many=True)                   #카테고리에 해당하는 메뉴들을 json화 
                new_menu_data = []
                for menudata in menu_serializer.data:                                       # QuerySet에 대한 직렬화된 데이터를 for문으로 순회
                    menu_ingredient_ids = menudata['menu_ingredient']                       # menu_ingredient 부분을 가져옴 (현재 id 값으로 저장되어 있음 - 리스트)
                    menu_ingredient = set(menu_ingredient_ids)                              # 비교를 위해 set으로 변환하기
                    if not menu_ingredient & exclude_ingredient:                            # 유저가 못 먹는 재료와 겹치는 재료가 없는 경우만 추가 
                        new_menu_data.append(menudata)
                    
                menulist['{}'.format(category.menucategory_name)] = new_menu_data   #메뉴 카테고리 이름 key, serialized data 를 value로 추가
    
        return Response(menulist)


class nonmember_MenulistView(APIView): # 비회원 메뉴 리스트 출력 
    def get(self, request):
        menulist={}
        menu_category = MenuCategory.objects.all() #메뉴 리스트 전체
        menulist['categories'] = []  #메뉴 카테고리를 저장하기 위한 리스트
        for category in menu_category:                                                      
            category_menu = Menu.objects.filter(menucategory = category.id)                 #카테고리에 해당되는 메뉴들 가져오기
            if category_menu.count() != 0 :                                                 #해당 카테고리에 하나라도 있을 때 :카테고리만 있고 메뉴는 하나도 없으면 추가하지 않음
                menulist['categories'].append(MenuCategorySerializer(category).data)        #메뉴 카테고리 리스트에 추가()
                menu_serializer = MenuSerializer(category_menu,many=True)                   #카테고리에 해당하는 메뉴들을 json화 
                menulist['{}'.format(category.menucategory_name)] = menu_serializer.data

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