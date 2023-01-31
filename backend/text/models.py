from django.db import models

from gdiary.models import Diary


class Result(models.Model):
    id = models.AutoField(primary_key=True) #pk
    diary_id = models.IntegerField(null=False) #fk
    keyword = models.CharField(max_length=10, null=False)

    def __str__(self, word, diary_id):
        self.keyword=word
        self.diary_id=diary_id
        return self.id
#
    # def __init__(self, keyword):
    #     self.keyword=keyword
    #     # return self.id
