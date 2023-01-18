from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from config.settings import *
from .serializers import *
from .models import *

class DiaryViewset(viewsets.ModelViewSet):
    queryset = Diary.objects.all()
    serializer_class = DiarySerializer   

