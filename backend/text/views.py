import os
import time

from konlpy.tag import Kkma
from requests import Response
from rest_framework.decorators import api_view
from config.celery import *
from rest_framework.response import Response
from rest_framework import status
from config.decode import decode
import django
django.setup()
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")

kkma = Kkma()
@api_view(['POST'])
def get_keyword(request):
    diary_keyword = decode.delay()

    while True:
        if diary_keyword.ready() == False:
            time.sleep(5)
            print("    delay...    ")
            continue
        else :
            print(diary_keyword.get())
            print(diary_keyword.ready())
            return Response({
                "result" :"성공"
            }, status=status.HTTP_201_CREATED)
