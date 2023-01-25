from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
# from backend.text.models import Diary
# from ai_model.app.views.text_views import get_keyword


def hello_world(request):
    return HttpResponse("hello world! this is text api")


diaries = [
    {
        'id': 1,
        'title': '오늘은 즐거운 날이다.',
        'contents': '아침에 먹은 사과가 맛있다. 짱이다.',
        'is_deleted': False
    },
    {
        'id': 2,
        'title': '오늘은 슬픈 날이다.',
        'contents': '피아노를 치는데 소리가 구리다. 자괴감이 대박이다.',
        'is_deleted': False
    },
    {
        'id': 3,
        'title': '새해 제주',
        'contents': '새해가 밝았습니다 제주도에 눈이 와요 어젠 목도리만 둘렀는데.. 날씨가 왕왕 많이 바뀌네요',
        'is_deleted': False
    },
]

# def new_post(request):
    # if request.method == 'POST':
    #     if request.POST['mainphoto']:
    #         new_article=Post.objects.create(
    #             postname=request.POST['postname'],
    #             contents=request.POST['contents'],
    #             mainphoto=request.POST['mainphoto'],
    #         )
    #     else:
    #         new_article=Post.objects.create(
    #             postname=request.POST['postname'],
    #             contents=request.POST['contents'],
    #             mainphoto=request.POST['mainphoto'],
    #         )
    #     return redirect('/blog/')
# text 분석 함수 post
# def get_contents(request):
#     if request.method == "POST":
#         new_diary = Diary.object.create(
#             diary_id = 1,
#             title = '오늘은 즐거운 날이다.',
#             contents = '피아노를 치는데 소리가 구리다. 자괴감이 대박이다.',
#             is_deleted = False
#         )
#
#     # db 연결 코드 추가
#     # 플라스크로 넘기기
#     keyword_json = get_keyword(new_diary.contents)
#     # 결과 받기
#     return HttpResponse("hello! this is get_keyword api")


# text 기반 그림 보여주기
# 1. 선택한 키워드 받기
# 2. 키워드 기반으로 db에서 이미지 불러오기
# 3. 반환