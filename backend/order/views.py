from django.shortcuts import render
from . import views
from rest_framework.views import APIView
from rest_framework.response import Response
from .serialize import *
from django.http import HttpResponse
import json
def test(request):
    return render(request,'test1.html',context={})

class MenulistView(APIView) :
    def get(self, request):
        menulist={}
        menu_category = MenuCategory.objects.all() #메뉴 리스트 전체
        menulist['categories'] = []
        for category in menu_category:
            category_menu = Menu.objects.filter(menucategory = category.id) #카테고리에 해당되는 메뉴들 가져오기
            if category_menu.count() != 0 : #해당 카테고리에 하나도 없으면?
                menulist['categories'].append(MenuCategorySerializer(category).data)
                menu_serializer = MenuSerializer(category_menu,many=True)
                menulist['{}'.format(category.menucategory_name)] = menu_serializer.data
            
        return Response(menulist)
    def post(self,request): #go payment
        data = json.loads(request.body)
        order_num = Order.objects.count()+10000000
        order_data = Order(user=User.objects.get(id=data['user']).id, payment=Payment().objects.get(id='0').id )
        order_data.save()
        order_list = Ordered_Item(ordered_menu_num=order_num,order=order_data.id,menu=data['menu'])
        order_list.save()        
        return HttpResponse("Order is completed")

class OptionView(APIView):
    def get(self,request,id):
        optionlist = {}
        option_category = OptionCategory.objects.all() #옵션 카테고리 전체
        optionlist['categories'] = []
        for category in option_category:
            options = Menu.objects.get(id=id).menu_option.filter(optioncategory = category.id)
            if options.count() != 0 : #해당되는 옵션이 하나도 존재하지 않는 카테고리는 프론트에 보낼 정보에 포함되지 않음.
                optionlist['categories'].append(OptionCategorySerializer(category).data)
                option_serializer = OptionSerializer(options,many=True)
                optionlist['{}'.format(category.optioncategory_name)] = option_serializer.data

        return Response(optionlist)

# class OrderView(APIView):
    