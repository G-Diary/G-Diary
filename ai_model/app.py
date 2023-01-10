from flask import Flask, abort, jsonify

app = Flask(__name__)


@app.route('/')
def hello():
    return 'Hello, My First Flask!'


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


@app.route('/api/v1/diaries/', methods=['GET'])
def get_diary():
    return jsonify({'diaries': diaries})


# @app.route("/user/<int:id>")
# def user_detail(id):
#     user = User.query.get_or_404(id)
#     return {
#         "username": User.username,
#         "email": User.email,
#         "picture": url_for("static", filename=f"users/{id}/profile.png"),
#     }

@app.route('/api/v1/diaries/<int:diary_id>', methods=['GET'])
def get_contents(diary_id):
    # diary = diaries.query.get_or_404[id=diary_id]
    for diary in diaries:
        if diary['id'] == diary_id:
            get_diary = diary

    if len(get_diary) == 0:
        abort(404)
    return jsonify(get_diary)
    # return f'diary : {diary_id}'


def main(args):
    print(args)
