from flask import Flask


def create_app():
    app = Flask(__name__)

    from .views import main_views
    app.register_blueprint(main_views.bp)
    # @app.route('/')
    # def hello():
    #     return 'Hello, My First Flask!'

    return app
