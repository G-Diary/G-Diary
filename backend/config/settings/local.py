from .base import *

DEBUG = True

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

#개발용
#python manage.py runserver --settings=config.settings.local