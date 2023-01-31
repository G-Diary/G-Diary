from django.db import models

# Create your models
#
# diaries = [
#     {
#         'id': 1,
#         'title': '오늘은 즐거운 날이다.',
#         'contents': '아침에 먹은 사과가 맛있다. 짱이다.',
#         'is_deleted': False
#     },
#     {
#         'id': 2,
#         'title': '오늘은 슬픈 날이다.',
#         'contents': '피아노를 치는데 소리가 구리다. 자괴감이 대박이다.',
#         'is_deleted': False
#     },
# ]
class Diary(models.Model):
    diary_id = models.IntegerField
    title = models.CharField(max_length=50)
    contents = models.TextField(max_length=50)
    is_deleted = models.BooleanField

    def __init__(self):
        return self.diary_id