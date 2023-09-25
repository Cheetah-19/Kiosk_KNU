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
        many=False,
        queryset=Vegetarian.objects.all(),
        slug_field='vegetarian_name',
        allow_null=True  # Allow null value for religion
    )
    
    user_allergy = serializers.SlugRelatedField(
        many=True,
        queryset=Allergy.objects.all(),
        slug_field='allergy_name',
        allow_null=True  # Allow null value for religion
    )


    religion = serializers.SlugRelatedField(
        many=False,
        queryset=Religion.objects.all(),
        slug_field='religion_type',
        allow_null=True  # Allow null value for religion
    )
    class Meta:
        model = User
        fields = ['user_name', 'user_phonenum', 'user_vegetarian', 'user_allergy', 'religion']


    def create(self, validated_data):
        user = User.objects.create(
            user_name=validated_data.get('user_name'),
            user_phonenum=validated_data.get('user_phonenum'),
        )

        vegetarian_name = validated_data.get('user_vegetarian')

        vegetarian =Vegetarian.objects.get(vegetarian_name = vegetarian_name)
        user.vegetarian_id = vegetarian.id

        allergy_names = validated_data.get('user_allergy')
        religion_type = validated_data.get('religion')

        if vegetarian_name is not None:
            vegetarian =Vegetarian.objects.get(vegetarian_name=vegetarian_name)
            user.vegetarian_id = vegetarian.id

        if allergy_names is not None:
            for allergy_name in allergy_names:
                allergy = Allergy.objects.get(allergy_name=allergy_name)
                user.user_allergy.add(allergy)

        if religion_type is not None:
            religion = Religion.objects.get(religion_type=religion_type)
            user.religion_id= religion.id

        user.save()

        return user




