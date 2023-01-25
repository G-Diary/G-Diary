from flask import Flask
from celery import shared_task

app = Flask(__name__)

@shared_task
def index():
    return "hello world"

if __name__ == "__main__":
    app.run()