import os
import time

from konlpy.tag import Kkma
from requests import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView

from config.celery import *
from rest_framework.response import Response
from rest_framework import status
from config.decode import decode
import django
from rest_framework.utils import json

from text.models import Result

from text.serializers import ResultSerializer

django.setup()
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")

kkma = Kkma()
@api_view(['POST'])
def get_keyword(request):
    body =  json.loads(request.body.decode('utf-8'))
    contents = body["contents"]
    diary_keyword = decode.delay(contents)

    while True:
        if diary_keyword.ready() == False:
            time.sleep(5)
            print("    delay...    ")
            continue
        else :
            for word in diary_keyword.get() :
                keyword_model = Result(keyword=word)
                keyword_model.save()

                # keyword_model=Result.objects.all()
                # keyword_model.keyword=word
                # keyword_model.save()


            print(diary_keyword.get())
            return Response({
                "result" :"성공"
            }, status=status.HTTP_201_CREATED)

            # error :
            #     "non_field_errors": [
            #         "유효하지 않은 데이터. 딕셔너리(dictionary)대신 list를 받았습니다."
            #     ]
            #  - result 필드(id, keywrod)를 한번에 딕셔너리 형태로 받아서 처리
            # serializer = ResultSerializer(data=diary_keyword.get())
            # if serializer.is_valid():
            #     serializer.save()
            #     return Response(serializer.data, status=status.HTTP_201_CREATED)

            # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
