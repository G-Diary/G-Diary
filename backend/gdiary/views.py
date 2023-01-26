from django.db.models import Q
from rest_framework import viewsets, status, serializers
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from django.shortcuts import get_object_or_404
from django.contrib.auth import authenticate
from config.settings import *
from .serializers import *
from .models import *
import jwt
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from rest_framework.permissions import IsAuthenticated
import boto3
import uuid
from django.http import JsonResponse

class ImageUploader(APIView) :
    
    def post(self, request) :
        try :
            files = request.FILES.getlist('files')
            s3r = boto3.resource('s3', aws_access_key_id= AWS_ACCESS_KEY_ID, aws_secret_access_key= AWS_ACCESS_ACCESS_KEY)

            for file in files :
                file._set_name(str(uuid.uuid4()))
                s3r.Bucket(AWS_STORAGE_BUCKET_NAME).put_object(Key='%s'%(file), Body=file, ContentType='jpg')
                
                image_url = AWS_S3_CUSTOM_DOMAIN+"/%s"%(file),
                
            return JsonResponse({"MESSGE" : "SUCCESS"}, status=200)

        except Exception as e :
            return JsonResponse({"ERROR" : e.message})
            
class RegisterAPIView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            # 토큰 접근
            token = TokenObtainPairSerializer.get_token(user)
            refresh_token = str(token)
            print(refresh_token)
            access_token = str(token.access_token)
            print(access_token)
            res = Response(
                {
                    "user": serializer.data,
                    "message": "register successs",
                    "token": {
                        "access": access_token,
                        "refresh": refresh_token,
                    },
                },
                status=status.HTTP_200_OK,
            )

            res.set_cookie("access", access_token, httponly=True)
            res.set_cookie("refresh", refresh_token, httponly=True)

            return res
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserViewset(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = SignSerializer       

    # 부분 수정 (단일 필드 수정)
    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return super().update(request, *args, **kwargs) 


class AuthAPIView(APIView):
    # 유저 정보 확인
    def get(self, request):
        try:
            # 유저 식별
            access = request.COOKIES['access']
            payload = jwt.decode(access, SECRET_KEY, algorithms=['HS256'])
            pk = payload.get('user_id')
            user = get_object_or_404(User, pk=pk)
            serializer = SignSerializer(instance=user)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except(jwt.exceptions.ExpiredSignatureError):
            # 토큰 만료 시 토큰 갱신
            data = {'refresh': request.COOKIES.get('refresh', None)}
            serializer = TokenRefreshSerializer(data=data)
            if serializer.is_valid(raise_exception=True):
                access = serializer.data.get('access', None)
                refresh = serializer.data.get('refresh', None)
                payload = jwt.decode(access, SECRET_KEY, algorithms=['HS256'])
                pk = payload.get('user_id')
                user = get_object_or_404(User, pk=pk)
                serializer = SignSerializer(instance=user)
                res = Response(serializer.data, status=status.HTTP_200_OK)
                res.set_cookie('access', access)
                res.set_cookie('refresh', refresh)
                return res
            raise jwt.exceptions.InvalidTokenError

        except(jwt.exceptions.InvalidTokenError):
            # 사용 불가능한 토큰
            return Response(status=status.HTTP_400_BAD_REQUEST)

    # 로그인
    def post(self, request):
    	# 유저 인증
        user = authenticate(
            email=request.data.get("email"), password=request.data.get("password")
        )
        if user is not None:
            serializer = SignSerializer(user)
            # 토큰 접근
            token = TokenObtainPairSerializer.get_token(user)
            refresh_token = str(token)
            access_token = str(token.access_token)
            res = Response(
                {
                    "user": serializer.data,
                    "message": "login success",
                    "token": {
                        "access": access_token,
                        "refresh": refresh_token,
                    },
                },
                status=status.HTTP_200_OK,
            )
            # 토큰, 쿠키에 저장
            res.set_cookie("access", access_token, httponly=True)
            res.set_cookie("refresh", refresh_token, httponly=True)
            return res
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    # 로그아웃
    def delete(self, request):
        # 쿠키에 저장된 토큰 삭제
        response = Response({
            "message": "Logout success"
            }, status=status.HTTP_202_ACCEPTED)
        response.delete_cookie("access")
        response.delete_cookie("refresh")
        return response

class DiaryViewset(viewsets.ModelViewSet):
    queryset = Diary.objects.all()
    serializer_class = DiarySerializer 
    
    # manual parameter
    param_date = openapi.Parameter(
        'diary_date',
        openapi.IN_QUERY,
        description='yyyy-mm-dd',
        type=openapi.FORMAT_DATE
    )

    # get_queryset에 데코레이터 인식 못하기 때문에 list 상속 받아 구현
    @swagger_auto_schema(manual_parameters=[param_date])
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    # api/v1/diaries/?date=2023-01-26
    def get_queryset(self):
        diaries = Diary.objects.filter(is_deleted = False)

        date = self.request.query_params.get('date', '')
        if date:
            diaries = diaries.filter(diary_date=date)
        return diaries

class KeywordViewset(viewsets.ModelViewSet):
    queryset = Keyword.objects.all()
    serializer_class = KeywordSerializer

class DrawingViewset(viewsets.ModelViewSet):
    queryset = Drawing.objects.all()
    serializer_class = DrawingSerializer

    # api/v1/drawings?keyword={}&keyword={}&...
    # def get_queryset(self):
    #     drawings = Drawing.objects.filter(is_deleted = False)

    #     keyword = self.request.GET.getlist('keyword', None)

    #     q=Q()

    #     if keyword:
    #         q &= Q(keyword__in = keyword)
    #         drawings = drawings.filter(q)
            
    #     return drawings

# @api_view(['POST'])
# def insertkeyword(request):
#     reqData = request.data
#     serializer = KeywordSerializer(data=reqData)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['POST'])
# def inserturl(request):
#     reqData = request.data
#     serializer = DrawingSerializer(data=reqData)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class ProductListAPI(APIView):
#     def get(self, request):
#         queryset = Drawing.objects.all()
#         print(queryset)
#         serializer = DrawingSerializer(queryset, many=True)
#         return Response(serializer.data)
    
