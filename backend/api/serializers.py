from rest_framework import serializers
from .models import *

class MenuSerializer(serializers.ModelSerializer):
    menu_ingredient = serializers.SlugRelatedField(
        many=True,
        queryset=Ingredient.objects.all(),
        slug_field='ingredient_name'
    )

    menu_option = serializers.SlugRelatedField(
        many=True,
        queryset=Option.objects.all(),
        slug_field='option_name'
    )


    class Meta:
        model = Menu
        fields = ['menu_name', 'menu_price', 'menu_introduction', 'menu_ingredient', 'menu_option']


class UserSerializer(serializers.ModelSerializer):
    
    user_vegetarian = serializers.SlugRelatedField(
        many=True,
        queryset=Vegetarian.objects.all(),
        slug_field='vegetarian_name'
    )

    user_allergy = serializers.SlugRelatedField(
        many=True,
        queryset=Allergy.objects.all(),
        slug_field='allergy_name'
    )


    class Meta:
        model = User
        fields = ['user_name', 'user_phonenum', 'user_vegetarian', 'user_allergy', 'religion']
        