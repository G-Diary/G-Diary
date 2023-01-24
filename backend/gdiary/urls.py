from django.urls import include, path
from .views import *
from rest_framework import routers
from rest_framework_simplejwt.views import TokenRefreshView


router = routers.DefaultRouter()
router.register(r'diaries', DiaryViewset)

# postman으로 router에 있는 것을 테스트할 때 '/' 유무 안 중요함
# postman으로 urlpatterns에 있는 것을 테스트할 때 '/' 유무 중요함
urlpatterns = [
    path('', include(router.urls)),

    path('users/join/', RegisterAPIView.as_view()), #회원가입
    path("users/auth/refresh/", TokenRefreshView.as_view()), #토큰 재발급
    path('users/auth/', AuthAPIView.as_view()), #로그인
]