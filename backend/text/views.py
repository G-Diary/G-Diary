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
from rest_framework.utils import json

from text.models import Result

django.setup()
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")

kkma = Kkma()
@api_view(['POST'])
def get_keyword(request):
    # body =  json.loads(request.body.decode('utf-8'))
    # contents = body["contents"]
    contents = request.POST.get('contents')
    diary_date = request.POST.get('diary_date')
    user_id = request.POST.get('user_id')
    diary_keyword = decode.delay(contents)

    while True:
        if diary_keyword.ready() == False:
            time.sleep(5)
            print("    delay...    ")
            continue
        else :
            for word in diary_keyword.get() :
                keyword_model = Result(keyword=word, diary_date=diary_date, user_id=user_id)
                keyword_model.save()
                print(word, diary_date, user_id)

            return Response({
                "result" :"성공"
            }, status=status.HTTP_201_CREATED)

