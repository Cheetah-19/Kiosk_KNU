from rest_framework import serializers
from signup.models import *

class MenuSerializer(serializers.ModelSerializer):
    class Meta :
        model = Menu
        exclude = ['menu_pic']
        
class MenuCategorySerializer(serializers.ModelSerializer):
    class Meta : 
        model = MenuCategory
        fields = '__all__'
        

        