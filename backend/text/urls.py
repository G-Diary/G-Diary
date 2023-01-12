from django.urls import path

from . import views

app_name='text'

urlpatterns = [
    path('api/v1/diaries/', views.hello_world)
]