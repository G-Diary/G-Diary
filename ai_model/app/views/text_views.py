from flask import Blueprint, jsonify, abort
from konlpy.tag import Kkma

kkma = Kkma()
bp = Blueprint('main', __name__, url_prefix='/')

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
]


@bp.route('/api/v1/diaries/<int:diary_id>', methods=['GET'])
def get_contents(diary_id):
    for diary in diaries:
        if diary['id'] == diary_id:
            get_diary = diary
    if len(get_diary) == 0:
        abort(404)

    get_keyword(get_diary)
    # return get_keyword(get_diary)


def get_keyword(diary):
    diary_keyword = kkma.nouns(diary)
    return_key = {"keyword": diary_keyword}
    return return_key


@bp.route('/hello')
def hello_pybo():
    return 'Hello, Pybo!'


@bp.route('/')
def hello_index():
    return 'index'
