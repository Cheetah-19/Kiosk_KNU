from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import *
from django.http import HttpResponse
import json

#여기서 회원 한명을 예시로 잡고 코딩할 예정 (신동혁)
#01099992222 / 김찬호 / Lacto(과일, 채소, 우유 빼고 불가능) / Pork(돼지고기 못먹음) / Judaism(돼지고기 못먹음)
class MenulistView(APIView): #메뉴 리스트 출력 (일단은 비회원 전제, 유저 데이터를 받으면 수정예정)
    def get(self, request):

        #메뉴를 띄우기 전에 회원이라면 메뉴 필터링을 적용해야 한다.
        #즉 회원 정보를 가져와야 함.

        #회원 정보 json 부분이 비어 있다면 (혹은 특정 값이 있다면) 비회원으로 인식 / 회원 정보 부분에 데이터가 있다면 회원
        UserGetter = User.objects.get(user_name = "김찬호") # 실제 앱을 쓸 때는 json에서 받아온 회원 정보로!
        #유저의 종교정보, 알러지정보, 비건정보를 가져올 것

        #이것은 재료를 저장하는 set , set 은 중복 허용하지 않으므로 이렇게 한 후 추후에 list 로 변환한다
        exclude_ingredient = set()
        #1. 종교 정보

        UserReligionGetter = UserGetter.religion
        if UserReligionGetter: 
            UserReligionIngredients = UserReligionGetter.religion_ingredient.all()
            for ingredient in UserReligionIngredients:
                exclude_ingredient.add(ingredient.id)
        else: 
            return

        #2. 알러지 정보
        UserAllergyGetter = UserGetter.user_allergy

        if UserAllergyGetter:
            UserAllergyIngredients = UserAllergyGetter.all()
            for allergy in UserAllergyIngredients:
                allergy_ingredients = allergy.allergy_ingredient.all()
                for ingredient in allergy_ingredients:
                    exclude_ingredient.add(ingredient.id)
        else:
            return

        #3. 비건 정보

        UserVegetarianGetter = UserGetter.user_vegetarian

        if UserVegetarianGetter:
            UserVegetarianIngredients = UserVegetarianGetter.vegetarian_ingredient.all()
            for vegetarian in UserVegetarianIngredients:
                exclude_ingredient.add(vegetarian.id)


        # exclude_ingredient = list(exclude_ingredient)   #유저가 못 먹는 재료 리스트인 exclude_ingredient완성
        # print(exclude_ingredient)


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
                    menu_ingredient_ids = menudata['menu_ingredient']   
                    # print(menu_ingredient_ids)                                              # menu_ingredient 부분을 가져옴 (현재 id 값으로 저장되어 있음 - 리스트)
                    menu_ingredient = set(menu_ingredient_ids)
                    if not menu_ingredient & exclude_ingredient:                            # 유저가 못 먹는 재료와 겹치는 재료가 없는 경우만 추가 
                        new_menu_data.append(menudata)
                        # print(new_menu_data)
                        # print("=====================")

                menulist['{}'.format(category.menucategory_name)] = new_menu_data   #메뉴 카테고리 이름 key, serialized data 를 value로 추가
            
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