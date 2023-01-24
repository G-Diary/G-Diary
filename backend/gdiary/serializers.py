from requests import Response
from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    # 회원가입, 로그인 둘 다 같은 Serializer 사용 (create 오버라이딩의 유무만 차이)
    class Meta:
        model = User
        fields = '__all__'

class DiarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Diary
        fields = '__all__'

class DrawingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Drawing
        fields = '__all__'

class KeywordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Keyword
        fields = '__all__'