from rest_framework import serializers
from signup.models import *


class MenuCategorySerializer(serializers.ModelSerializer):
    class Meta : 
        model = MenuCategory
        fields = '__all__'
        
class OptionSerializer(serializers.ModelSerializer):
    class Meta :
        model = Option
        fields = '__all__'
        
class OptionCategorySerializer(serializers.ModelSerializer):
    class Meta :
        model = OptionCategory
        fields = '__all__'
class IngredientSerializer(serializers.ModelSerializer):
    class Meta :
        model = Ingredient
        fields = '__all__'

class MenuSerializer(serializers.ModelSerializer):
    class Meta :
        model = Menu
        fields = '__all__'
        