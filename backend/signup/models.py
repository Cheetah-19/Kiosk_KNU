from django.db import models
from datetime import datetime

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

