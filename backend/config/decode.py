import jpype
from konlpy.tag import Kkma
from config.celery import *



@app.task(name="decode")
def decode():
    kkma = Kkma()
    a = kkma.nouns("새해가 밝았습니다 제주도에 눈이 와요 어젠 목도리만 둘렀는데.. 날씨가 왕왕 많이 바뀌네요")
    return a