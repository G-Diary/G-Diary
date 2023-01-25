from flask import Blueprint, jsonify, abort
from konlpy.tag import Kkma
from backend.config.celery import app
from celery import shared_task
from __future__ import absolute_import, unicode_literals

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


kkma = Kkma()
# @bp.route('/api/v1/diaries/<int:diary_id>', methods=['GET'])
@app.shared_task
def get_keyword(diary_contents):
    # for diary in diaries:
    #     if diary['id'] == diary_id:
    #         get_diary = diary
    if len(diary_contents) == 0:
        abort(404)

    diary_keyword = kkma.nouns(diary_contents)
    return_key = {"keyword": diary_keyword}
    return return_key

@app.shared_task
def hello_pybo():
    return 'Hello, Pybo!'


# @bp.route('/')
# def hello_index():
#     return 'index'
