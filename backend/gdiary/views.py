from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from config.settings import *
from .serializers import *
from .models import *

class DiaryViewset(viewsets.ModelViewSet):
    queryset = Diary.objects.all()
    serializer_class = DiarySerializer 

    # manual parameter
    param_date = openapi.Parameter(
        'diary_date',
        openapi.IN_QUERY,
        description='yyyy-mm-dd',
        type=openapi.FORMAT_DATE
    )

    @swagger_auto_schema(manual_parameters=[param_date])
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

   
    def get_queryset(self):
        diaries = Diary.objects.filter(is_deleted = False)

        date = self.request.query_params.get('date', '')
        if date:
            diaries = diaries.filter(diary_date=date)
        return diaries

    
