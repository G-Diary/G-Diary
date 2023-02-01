import os

from celery import Celery

# Set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

app = Celery('config',  backend='rpc://', broker='pyamqp://guest@rabbitmq//', include=['text.views'])

app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()


#(선택) 추가설정
app.conf.update(
    result_expires=3600,
)

if __name__ == '__main__':
    app.start()