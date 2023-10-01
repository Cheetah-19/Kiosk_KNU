from django.contrib import admin

from signup.models import Ingredient, Menu, Option,Payment,Order,Ordered_Item
# Register your models here.

admin.site.register(Menu)
admin.site.register(Option)
admin.site.register(Payment)
admin.site.register(Order)
admin.site.register(Ordered_Item)