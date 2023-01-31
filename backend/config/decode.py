import jpype
from konlpy.tag import Kkma
from config.celery import *



@app.task(name="decode")
def decode(contents_arg):
    kkma = Kkma()
    a = kkma.nouns(contents_arg)
    return a