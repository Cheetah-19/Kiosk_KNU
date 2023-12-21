from django.shortcuts import render
from rest_framework.views import APIView
from .serialize import *
from django.http import HttpResponse
import json
def test(request):
    return render(request,'test1.html',context={})

class OrderView(APIView):
    def post(self,request): #go payment
        post_data = json.loads(request.body)['cart'] #HTTP POST 요청의 본문(body)을 JSON 형식으로 파싱하여 Python 딕셔너리로 변환
        post_data_user = post_data[0]['user'] #나중에 user정보가 추가되면 여기에 user의 번호가 올 것이다
        order_num = Order.objects.count()+10000000 #order 객체의 수 세고, 거기다 10000000 더해서 새로운 주문번호 생성
        if(post_data_user == ""):
                order_data = Order(\
                user=User.objects.get(user_phonenum="00000000000"),\
                order_num=order_num,\
                payment=Payment.objects.get(payment_name='Credit')\
            )
                order_data.save()
        else:
            order_data = Order(\
                user=User.objects.get(user_phonenum=post_data_user),\
                order_num=order_num,\
                payment=Payment.objects.get(payment_name='Credit')\
            )
            order_data.save()                      #주문 정보 저장 (user는 db에 있는거 아무거나, payment는 credit으로 임시로 설정해놓음)

        menudistinctionnum = 1                 #메뉴 구분을 위한 숫자..
        for order_menu in post_data:                                            #첫번째 for : 선택된 메뉴들
            chosen_options = order_menu['options']                  #선택된 해당 메뉴의 옵션들
            empty = True

            if chosen_options == {}:                                 #선택된 옵션이 존재하지 않을 때
                order_menu_info = Ordered_Item(\
                    order=order_data,\
                    menu=Menu.objects.get(id=order_menu['menu']['id']),\
                    menu_num=menudistinctionnum,\
                    option=None\
                )        
                menudistinctionnum+=1
                order_menu_info.save() 
            else:                                                   # 선택된 옵션이 존재할 때
                for option_name, option_num in chosen_options.items():
                    order_menu_info = Ordered_Item(
                        order=order_data,\
                        menu=Menu.objects.get(id=order_menu['menu']['id']),\
                        menu_num=menudistinctionnum,\
                        option=Option.objects.get(option_name__iexact=option_name),\
                        option_num=option_num\
                    )
                    order_menu_info.save()
                menudistinctionnum+=1         
        return HttpResponse("Order is completed")
    

class user_OrderDetailView(APIView):
    def get(self, request, userphonenum):
        UserGetter = User.objects.get(user_phonenum = userphonenum) 
        UserOrderGetter = Order.objects.filter(user=UserGetter)

        order_number = 1
        for order in UserOrderGetter:
            print("=========================================")
            print(str(order_number) + "번째 주문")
            print(order.order_time)
            print ("~~~~~~~~~~~~~~~~~~~~~~~~")
            order_number += 1
            UserOrderedItemGetter = Ordered_Item.objects.filter(order=order)
            menunownnum = 0
            for orderitem in UserOrderedItemGetter:
                if(menunownnum == orderitem.menu_num):                    #전 거와 메뉴가 동일하되 옵션만 다른 경우이므로 옵션만 출력하면 된다.
                    print(orderitem.option)

                else:
                    print(str(orderitem.menu_num) + "번째 메뉴")
                    print(orderitem.menu)
                    print(orderitem.option)
                    menunownnum = orderitem.menu_num
        print("")
        print("가장 많이 주문한 메뉴 top 5")
        popular_menus = get_popular_menus(5)
        for menu in popular_menus:
            print(f"{menu['menu__menu_name']} || 누적 주문 횟수: {menu['menu_count']}")

        print("")
        print("제한 요소 고려 ver - 가장 많이 주문한 메뉴 top 5")
        popular_menus_exclue_ver = get_popular_menus_exclude_ver(UserGetter, 5)
        for menu in popular_menus_exclue_ver:
            print(f"{menu['menu__menu_name']} || 누적 주문 횟수: {menu['menu_count']}")
            
        print("")
        print(str(UserGetter) + "님이 가장 많이 주문한 메뉴 top 5")
        user_favorite_menus = get_popular_menus_by_user(UserGetter, 5)
        for menu in user_favorite_menus:
            print(f"{menu['menu__menu_name']} || 누적 주문 횟수: {menu['menu_count']}")




        return HttpResponse("OrderDetailView is completed")
