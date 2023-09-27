from django.contrib import admin

from signup.models import Ingredient, Menu, Option
# Register your models here.

admin.site.register(Menu)
admin.site.register(Option)

