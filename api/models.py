from django.db import models



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
    
class Region(models.Model):
    region_type = models.CharField(max_length=50)
    region_ingredient = models.ManyToManyField(Ingredient)

    def __str__(self):
        return self.region_type

class User(models.Model):
    user_phonenum = models.CharField(max_length=13, null=True)
    user_vegetarian = models.ManyToManyField(Vegetarian)
    user_allergy = models.ManyToManyField(Allergy)
    region = models.ForeignKey(Region, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.user_phonenum

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    payment = models.ForeignKey(Payment, on_delete=models.CASCADE)

class Option(models.Model):
    option_name = models.CharField(max_length=100)
    option_price = models.PositiveIntegerField()
    option_pic = models.CharField(max_length=500, null=True)
    option_introduction = models.TextField(null=True)
    
    def __str__(self):
        return self.option_name

class Menu(models.Model):
    menu_name = models.CharField(max_length=50)
    menu_pic = models.URLField(max_length=500, null=True)
    menu_price = models.PositiveIntegerField()
    menu_introduction = models.TextField(null=True)
    menu_ingredient = models.ManyToManyField(Ingredient)
    menu_option = models.ManyToManyField(Option)

    def __str__(self):
        return self.menu_name

class Ordered_Item(models.Model):
    ordered_menu_num = models.SmallIntegerField()
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.ordered_menu_num)





