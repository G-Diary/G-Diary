from rest_framework import serializers
from .models import *
class ResultSerializer(serializers.ModelSerializer):

    class Meta:
        model = Result
        #모두 직렬화하겠음
        fields = '__all__'