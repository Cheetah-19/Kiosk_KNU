from django.contrib import admin

from .models import User, Allergy, Vegetarian, Religion
# Register your models here.

admin.site.register(User)
admin.site.register(Allergy)
admin.site.register(Vegetarian)
admin.site.register(Religion)