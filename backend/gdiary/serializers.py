from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        user = User.objects.create_user(
            email = validated_data['email'],
            nickname = validated_data['nickname'],
            password = validated_data['password']
        )
        return user

    class Meta:
        model = User
        fields = ['nickname', 'email', 'password']
        
class SignSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        #모두 직렬화하겠음
        fields = '__all__'

class DiarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Diary
        fields = '__all__'

class DrawingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Drawing
        fields = ['keyword', 'image_url']

# class ResultSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Result
#         fields = '__all__'

class KeywordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Keyword
        fields = "__all__"