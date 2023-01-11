from flask import Flask, abort, jsonify
from konlpy.tag import Kkma
from konlpy.utils import pprint
kkma = Kkma()


def create_app():
    app = Flask(__name__)
    if __name__ == "__main__":
        app.run()
    # @app.route('/')
    # def hello():
    #     return 'Hello, My First Flask!'
    from .views import main_views
    app.register_blueprint(main_views.bp)

    # return app

    # diaries = [
    #     {
    #         'id': 1,
    #         'title': '오늘은 즐거운 날이다.',
    #         'contents': '아침에 먹은 사과가 맛있다. 짱이다.',
    #         'is_deleted': False
    #     },
    #     {
    #         'id': 2,
    #         'title': '오늘은 슬픈 날이다.',
    #         'contents': '피아노를 치는데 소리가 구리다. 자괴감이 대박이다.',
    #         'is_deleted': False
    #     },
    # ]

    # @app.route('/api/v1/diaries/', methods=['GET'])
    # def get_diary():
    #     return jsonify({'diaries': diaries})

    # @app.route('/api/v1/diaries/<int:diary_id>', methods=['GET'])
    # def get_contents(diary_id):
    #     for diary in diaries:
    #         if diary['id'] == diary_id:
    #             get_diary = diary

    #     if len(get_diary) == 0:
    #         abort(404)

    #     return jsonify(get_diary)

    # def show_keyword(diary):
    #     response_word = {'keyword': kkma.nouns(diary['contents'])}
    #     return response_word

    # def main(args):
    #     print(args)
