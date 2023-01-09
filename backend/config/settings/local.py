from .base import *

ALLOWED_HOSTS = []

DEBUG=True

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': env('NAME'),
        'USER': env('DB_USER'),
        'PASSWORD': env('PASSWORD'),
        'HOST': env('HOST'),
        'PORT': env('PORT'),
        'OPTIONS': {
            'init_command': 'SET sql_mode="STRICT_TRANS_TABLES"'
        }
    }
}

#생성자, local 서비스
#python manage.py runserver --settings=config.settings.local