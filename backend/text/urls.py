from django.urls import path

from . import views

app_name='text'

urlpatterns = [
    path('api/v1/text', views.get_keyword)
]