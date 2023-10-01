from django.shortcuts import render
from . import views
from rest_framework.views import APIView
from rest_framework.response import Response
from .serialize import *
from django.http import HttpResponse
import json
def test(request):
    return render(request,'test1.html',context={})

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
    def get(self,request,id):
        optionlist = {}
        option_category = OptionCategory.objects.all()                                          #옵션 카테고리 전체
        optionlist['categories'] = []                                                           #옵션 카테고리들을 넣어놓을 리스트
        for category in option_category:                                                        #선택한 메뉴(id)에 하나라도 옵션 카테고리에 해당하는게 있을 경우
            options = Menu.objects.get(id=id).menu_option.filter(optioncategory = category.id)  #선택한 메뉴에 있는 옵션들 중 카테고리에 해당되는 옵션들만 가져오기 
            if options.count() != 0 :                                                           #해당되는 옵션이 하나도 존재하지 않는 카테고리는 프론트에 보낼 정보에 포함되지 않음.
                optionlist['categories'].append(OptionCategorySerializer(category).data)        #옵션 카테고리 리스트에 추가
                option_serializer = OptionSerializer(options,many=True)                         
                optionlist['{}'.format(category.optioncategory_name)] = option_serializer.data  #옵션 카테고리 이름 key, serialized data를 value로 추가 

        return Response(optionlist)

class OrderView(APIView):
    def post(self,request): #go payment
        post_data = json.loads(request.body)['cart'] #HTTP POST 요청의 본문(body)을 JSON 형식으로 파싱하여 Python 딕셔너리로 변환
        print(post_data)
        order_num = Order.objects.count()+10000000 #order 객체의 수 세고, 거기다 10000000 더해서 새로운 주문번호 생성
        order_data = Order(\
            user=User.objects.get(user_phonenum='01022221111'),\
            order_num=order_num,\
            payment=Payment.objects.get(payment_name='Credit')\
        )
        order_data.save()                      #주문 정보 저장 (user는 db에 있는거 아무거나, payment는 credit으로 임시로 설정해놓음)
        for order_menu in post_data:                                            #첫번째 for : 선택된 메뉴들
            chosen_option = order_menu['menu']['menu_option']                    #선택된 해당 메뉴의 옵션들
            empty = True
            for order_option in chosen_option:                                   #두번째 for : 선택된 메뉴의 옵션들 (option 하나도 없는 경우 {} 빈 딕셔너리로 들어옴)
                if(len(order_option)) != 0:
                    empty=False
                    order_menu_info = Ordered_Item(\
                        order=order_data,\
                        menu= Menu.objects.get(id=order_menu['menu']['id']),\
                        option=Option.objects.get(id=order_option['id']) \
                    )
                    order_menu_info.save()     
            if empty == True:                                                       #아무런 옵션이 선택되지 않았다면 option에 null 추가
                order_menu_info = Ordered_Item(\
                    order=order_data,\
                    menu=Menu.objects.get(id=order_menu['menu']['id']),\
                    option=None\
                )        
                order_menu_info.save()                                 
        return HttpResponse("Order is completed")