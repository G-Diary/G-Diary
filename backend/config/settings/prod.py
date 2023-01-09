from .base import *

DEBUG = False

ALLOWED_HOST = ['*']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'diary',
        'USER': 'root',
        'PASSWORD': 'jspbook',
        'HOST':'localhost',
        'PORT':'3306',
    }
}

#서비스용
#python manage.py runserver --settings=config.settings.prod