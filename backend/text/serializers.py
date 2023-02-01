from rest_framework import serializers
from .models import *
class ResultSerializer(serializers.ModelSerializer):

    class Meta:
        model = Result
        fields = ['diary_date', 'keyword']