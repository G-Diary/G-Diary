from flask import Flask

app = Flask(__name__)


@app.route('/')
def hello():
    return 'Hello, My First Flask!'


def main(args):
    print(args)