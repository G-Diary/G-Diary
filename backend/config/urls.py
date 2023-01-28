from django.contrib import admin
from django.urls import include, path, re_path
from django.conf import settings
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions

schema_view = get_schema_view( 
    openapi.Info( 
        title="GDiary API", 
        default_version="v1", 
        description='''
        사용자가 작성한 일기에서 키워드를 추출하여 그림일기를 그리는 서비스 
        ''',
        terms_of_service="", 
    ), 
    public=True, 
    permission_classes=(permissions.AllowAny,), 
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('gdiary.urls')),
    path('api/v1/', include('text.urls')),
]

if settings.DEBUG:
    urlpatterns += [
        re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name="schema-json"),
        re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
        re_path(r'^redocs/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),    
    ]
