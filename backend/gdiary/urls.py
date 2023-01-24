from django.urls import include, path
from .views import *
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'diaries', DiaryViewset)

# postman으로 router에 있는 것을 테스트할 때 '/' 유무 안 중요함
# postman으로 urlpatterns에 있는 것을 테스트할 때 '/' 유무 중요함
urlpatterns = [
    path('', include(router.urls)),
]