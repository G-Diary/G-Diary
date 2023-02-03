from django.urls import include, path
from .views import *
from rest_framework import routers
from rest_framework_simplejwt.views import TokenRefreshView
from . import views


router = routers.DefaultRouter()
router.register(r'diaries', DiaryViewset)
router.register(r'keyword', KeywordViewset) 
router.register(r'drawings', DrawingViewset)
router.register(r'users', UserViewset) 

# postman으로 router에 있는 것을 테스트할 때 '/' 유무 안 중요함
# postman으로 urlpatterns에 있는 것을 테스트할 때 '/' 유무 중요함
urlpatterns = [
    path('', include(router.urls)),
    
    path('join', RegisterAPIView.as_view()), #회원가입
    path('auth/refresh', TokenRefreshView.as_view()), #토큰 재발급
    path('auth', AuthAPIView.as_view()), #로그인
    path('images/upload', ImageUploader.as_view()),
    path('results', SelectImageAPIView.as_view()),
]