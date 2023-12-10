from django.contrib import admin

from .models import Ingredient, Vegetarian, Allergy, Religion, MenuCategory, OptionCategory, User, PreprocessedData
# Register your models here.

admin.site.register(Ingredient)
admin.site.register(Allergy)
admin.site.register(Vegetarian)
admin.site.register(Religion)
admin.site.register(MenuCategory)
admin.site.register(OptionCategory)
admin.site.register(User)
admin.site.register(PreprocessedData)