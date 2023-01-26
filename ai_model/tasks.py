from flask import jsonify, abort
from konlpy.tag import Kkma
from backend.config.celery import app
from __future__ import absolute_import, unicode_literals


kkma = Kkma()

def get_keyword(diary_contents):
    if len(diary_contents) == 0:
        abort(404)

    diary_keyword = kkma.nouns(diary_contents)
    return_key = {"keyword": diary_keyword}
    return return_key
