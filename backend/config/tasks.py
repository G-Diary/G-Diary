from __future__ import absolute_import, unicode_literals
from .celery import app
import time

diaries = [
    {
        'id': 1,
        'title': '오늘은 즐거운 날이다.',
        'contents': '아침에 먹은 사과가 맛있다. 짱이다.',
        'is_deleted': False
    },
    {
        'id': 2,
        'title': '오늘은 슬픈 날이다.',
        'contents': '피아노를 치는데 소리가 구리다. 자괴감이 대박이다.',
        'is_deleted': False
    },
    {
        'id': 3,
        'title': '새해 제주',
        'contents': '새해가 밝았습니다 제주도에 눈이 와요 어젠 목도리만 둘렀는데.. 날씨가 왕왕 많이 바뀌네요',
        'is_deleted': False
    },
]
@app.task
def longtime_add(x, y):
    print('long time task begins')
    # sleep 5 seconds
    time.sleep(5)
    print('long time task finished')
    return x + y

@app.task
def add(x, y):
    return x + y

@app.task
def mul(x, y):
    return x * y

@app.task
def xsum(numbers):
    return sum(numbers)