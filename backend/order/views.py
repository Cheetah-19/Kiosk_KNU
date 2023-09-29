from django.shortcuts import render
from . import views
from rest_framework.views import APIView
from rest_framework.response import Response
from .serialize import *

def test(request):
    return render(request,'test1.html',context={})

class MenulistView(APIView) :
    def get(self, request):
        menulist={}
        menu_category = MenuCategory.objects.all()
        category_serializer = MenuCategorySerializer(menu_category,many=True)
        menulist['categories'] = category_serializer.data
        for category in menu_category:
            category_menu = Menu.objects.filter(menucategory = category.id)
            menu_serializer = MenuSerializer(category_menu,many=True)
            menulist['{}'.format(category.menucategory_name)] = menu_serializer.data
        
        return Response(menulist)

class OptionView(APIView):
    def get(self,request,id):
        optionlist = {}
        option_category = OptionCategory.objects.all()
        # category_serializer = OptionCategorySerializer(option_category,many=True)
        optionlist['categories'] = []
        for category in option_category:
            options = Menu.objects.get(id=id).menu_option.filter(optioncategory = category.id)
            if options.count() != 0 :
                optionlist['categories'].append(OptionCategorySerializer(category).data)
                option_serializer = OptionSerializer(options,many=True)
                optionlist['{}'.format(category.optioncategory_name)] = option_serializer.data

        return Response(optionlist)
