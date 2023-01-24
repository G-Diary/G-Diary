from flask import Blueprint, jsonify, abort
from konlpy.tag import Kkma
from backend.config.celery import app
from celery import shared_task
from __future__ import absolute_import, unicode_literals


kkma = Kkma()
bp = Blueprint('main', __name__, url_prefix='/')

# @bp.route('/api/v1/diaries/<int:diary_id>', methods=['GET'])
# @app.task
# def get_keyword(diary_contents):
#     # for diary in diaries:
#     #     if diary['id'] == diary_id:
#     #         get_diary = diary
#     if len(diary_contents) == 0:
#         abort(404)
#
#     diary_keyword = kkma.nouns(diary_contents)
#     return_key = {"keyword": diary_keyword}
#     return return_key

@app.task
@bp.route('/')
def hello_pybo():
    return 'Hello, Pybo!'


# @bp.route('/')
# def hello_index():
#     return 'index'
