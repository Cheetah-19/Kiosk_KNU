from rest_framework import serializers
from .models import *
from rest_framework.response import Response
from face_recognition.face_methods import base_to_vector
class UserSerializer(serializers.ModelSerializer):
    
    user_vegetarian = serializers.SlugRelatedField(
        many=False,
        queryset=Vegetarian.objects.all(),
        slug_field='vegetarian_name',
        allow_null=True,  # Allow null value for vege
        required=False  # allow no vege information
    )
    
    user_allergy = serializers.SlugRelatedField(
        many=True,
        queryset=Allergy.objects.all(),
        slug_field='allergy_name',
        allow_null=True,  # Allow null value for allergy
        required=False # allow no allergy   
    )


    religion = serializers.SlugRelatedField(
        many=False,
        queryset=Religion.objects.all(),
        slug_field='religion_type',
        allow_null=True,  # Allow null value for religion
        required=False
    )

    class Meta:
        model = User
        fields = ['user_name', 'user_phonenum', 'user_vegetarian', 'user_allergy', 'religion', 'user_face_info']
    def create(self, validated_data):
        username=validated_data.get('user_name')
        userphonenum=validated_data.get('user_phonenum')
        user_face_base = validated_data.get('user_face_info')
        user_face_base_list = user_face_base.split('||')
        
        #username 이나 userphonenum 이 null 인 경우
        if username == "" or userphonenum == "":
            raise serializers.ValidationError({'message': '입력값이 없어서 등록이 불가합니다.'})

        is_user_name_already_here = User.objects.filter(user_name=username).exists()
        is_user_phonenum_already_here = User.objects.filter(user_phonenum=userphonenum).exists()

        if is_user_name_already_here or is_user_phonenum_already_here:
            error_message = ''
            if is_user_name_already_here and is_user_phonenum_already_here:
                error_message = '이미 등록된 사용자 이름과 전화번호입니다.'
            elif is_user_name_already_here:
                error_message = '이미 등록된 사용자 이름입니다.'
            else:
                error_message = '이미 등록된 전화번호입니다.'
            raise serializers.ValidationError({'message': error_message})
        
        else:
            user = User.objects.create(
            user_name=username,
            user_phonenum=userphonenum,
            )
            vegetarian_name = validated_data.get('user_vegetarian')
            religion_type = validated_data.get('religion')
            allergy_names = validated_data.get('user_allergy')
            exclude_ingredient = set()


            if vegetarian_name is not None:
                vegetarian = Vegetarian.objects.get(vegetarian_name=vegetarian_name)
                user.vegetarian_id = vegetarian.id

                UserVegetarianIngredients = vegetarian.vegetarian_ingredient.all()
                for vegetarian in UserVegetarianIngredients:
                    exclude_ingredient.add(vegetarian.id)

            if religion_type is not None:
                religion = Religion.objects.get(religion_type=religion_type)
                user.religion = religion

                UserReligionIngredients = religion.religion_ingredient.all()
                for ingredient in UserReligionIngredients:
                    exclude_ingredient.add(ingredient.id)

            if allergy_names is not None:
                for allergy_name in allergy_names:
                    allergy = Allergy.objects.get(allergy_name=allergy_name)
                    user.user_allergy.add(allergy)

                    allergy_ingredients = allergy.allergy_ingredient.all()
                    for ingredient in allergy_ingredients:
                        exclude_ingredient.add(ingredient.id)


            print(exclude_ingredient)

            if user_face_base_list is not None:
                face_list = base_to_vector(user_face_base_list)
                print(len(face_list))
                user.user_face_info = str(face_list)
            else:
                print("no face-info")


            user.save()
            if exclude_ingredient.len() == 0 :
                preprocessed_data = PreprocessedData.objects.create(
                    user=user,
                    excluded_ingredients = 'empty'  )#set 을 string 형태로 바꾸어
            else :
                preprocessed_data = PreprocessedData.objects.create(
                    user=user,
                    excluded_ingredients = str(exclude_ingredient)  )
            return user