from django.db import models
from django.db.models import Count
from datetime import datetime
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

class Payment(models.Model):
    payment_name = models.CharField(max_length=50)
    def __str__(self):
        return self.payment_name

class Ingredient(models.Model):
    ingredient_name = models.CharField(max_length=50)

    def __str__(self):
        return self.ingredient_name
    
class Vegetarian(models.Model):
    vegetarian_name = models.CharField(max_length=50)
    vegetarian_ingredient = models.ManyToManyField(Ingredient)

    def __str__(self):
        return self.vegetarian_name
    
    
class Allergy(models.Model):
    allergy_name = models.CharField(max_length=50)
    allergy_ingredient = models.ManyToManyField(Ingredient)

    def __str__(self):
        return self.allergy_name
    
class Religion(models.Model):
    religion_type = models.CharField(max_length=50)
    religion_ingredient = models.ManyToManyField(Ingredient)

    def __str__(self):
        return self.religion_type

class MenuCategory(models.Model):
    menucategory_name = models.CharField(max_length=50)

    def __str__(self):
        return self.menucategory_name

class OptionCategory(models.Model):
    optioncategory_name = models.CharField(max_length=50)

    def __str__(self):
        return self.optioncategory_name


class Option(models.Model):
    option_name = models.CharField(max_length=100)
    option_price = models.PositiveIntegerField()
    # option_pic = models.CharField(max_length=500, null=True)
    option_pic = models.ImageField(blank=True,null=True,upload_to="option")
    option_introduction = models.TextField(null=True)
    optioncategory = models.ForeignKey(OptionCategory, on_delete=models.CASCADE, null=True, blank=True) 

    def __str__(self):
        return self.option_name

class Menu(models.Model):
    menu_name = models.CharField(max_length=50)
    # menu_pic = models.URLField(max_length=500, null=True)
    menu_pic = models.ImageField(blank=True, upload_to="menu",null=True)
    menu_price = models.PositiveIntegerField()
    menu_introduction = models.TextField(null=True)
    menu_ingredient = models.ManyToManyField(Ingredient)
    menu_option = models.ManyToManyField(Option)
    menucategory = models.ForeignKey(MenuCategory, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.menu_name


class User(models.Model):
    user_phonenum = models.CharField(max_length=13, null=True)
    user_name = models.CharField(max_length=50, null=True)
    user_vegetarian = models.ForeignKey(Vegetarian, on_delete=models.CASCADE, null=True, blank=True)
    user_allergy = models.ManyToManyField(Allergy, blank=True)#빈칸허용
    religion = models.ForeignKey(Religion, on_delete=models.CASCADE, null=True, blank=True) #종교가 없을 수 있기 때문에, null = true 를 추가했고
    #유효성 검사를 통과하기 위해 blank=True 를 설정함
    user_face_info = models.TextField(null=True)


    def __str__(self):
        return self.user_phonenum

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    payment = models.ForeignKey(Payment, on_delete=models.CASCADE)
    order_num = models.PositiveIntegerField(default=0)
    order_time = models.DateTimeField(default=datetime.now) #주문 날짜와 시간 추가
    def __str__(self):
        return str(self.order_num)
    
class Ordered_Item(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE)
    menu_num = models.IntegerField(null=True)                       #메뉴 구분을 위한 num
    option = models.ForeignKey(Option, on_delete=models.CASCADE,null=True)
    option_num = models.IntegerField(null=True)                     #옵션 갯수 
    def __str__(self):
        return str(self.order.order_num)


class PreprocessedData(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # order = models.ForeignKey(Order, on_delete=models.CASCADE)
    # ordered_item = models.ForeignKey(Ordered_Item, on_delete=models.CASCADE)

    # 종교, 알러지, 비건 등의 이유로 못 먹는 재료들의 id를 저장해 둠
    excluded_ingredients = models.TextField(null=True)
    def __str__(self):
        return str(self.user.user_phonenum)




# 전체 주문 메뉴 top 5 - for 회원 및 비회원
def get_popular_menus(top_n):
    # Ordered_Item에서 각 메뉴의 빈도를 집계하고 상위 N개를 가져옵니다.
    popular_menus = Ordered_Item.objects.values('menu__menu_name').annotate(menu_count=Count('menu')).order_by('-menu_count')[:top_n]
    return popular_menus

# 전체 주문 메뉴 top 5 - for 회원 
# ( 알러지 , 종교, 비건 에 따라 제한되는 재료를 사용하는 음식을 제외한 메뉴 랭킹)
def get_popular_menus_exclude_ver(user, top_n):

    # 사용자가 제외할 재료를 리스트로 파싱
    excluded_ingredients = list(map(int, user.preprocesseddata.excluded_ingredients.strip('{}').split(',')))
    popular_menus_exclude_ver = (
        Ordered_Item.objects
        .values('menu__menu_name')                 # 전체 메뉴 중에서 메뉴 이름을 가져옴
        .annotate(menu_count=Count('menu'))        # 메뉴 이름 기준으로 그룹화 , 각 메뉴의 주문 횟수를 세어 menu_count 필드로 추가
        .exclude(menu__menu_ingredient__in=excluded_ingredients)  # 사용자가 제외할 재료가 포함된 메뉴는 제외
        .order_by('-menu_count')[:top_n]           # 주문 횟수 기준 내림차순 정렬 후 top_n 개의 메뉴 가져옴
    )

    return popular_menus_exclude_ver

# 회원별 주문 메뉴 top 5
def get_popular_menus_by_user(user, top_n):
    # 특정 사용자가 주문한 각 메뉴의 빈도를 집계하고 상위 N개를 가져옵니다.
    top_menus_by_user = (
        Ordered_Item.objects
        .filter(order__user=user)              # 해당 사용자가 주문한 항목들을 필터링
        .values('menu__menu_name')             # 주문 항목들 중에서 메뉴 이름을 가져옴
        .annotate(menu_count=Count('menu'))    # 메뉴 이름 기준으로 그룹화 , 각 메뉴의 주문 횟수를 세어 menu_count 필드로 추가
        .order_by('-menu_count')[:top_n]       # 주문 횟수 기준 내림차순 정렬 후 top_n 개의 메뉴 가져옴
    )

    return top_menus_by_user                   # 각 메뉴 이름 - 주문 횟수 담은 Queryset 반환    

    #QuertSet 예시
    #<QuerySet [{'menu__menu_name': '파송송 라면', 'menu_count': 1}, {'menu__menu_name': '치즈 폭탄 라면', 'menu_count': 1}, {'menu__menu_name': '연어 샐러드', 'menu_count': 1}, {'menu__menu_name': '쌀국수', 'menu_count': 1}, {'menu__menu_name': '불닭 국수', 'menu_count': 1}]>


# ##############################################################################################################
