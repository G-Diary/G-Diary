from django.db import models

from gdiary.models import Diary


class Result(models.Model):
    id = models.AutoField(primary_key=True) #pk
    diary_date = models.DateField(null=False)
    user_id = models.IntegerField(null=False)
    keyword = models.CharField(max_length=10, null=False)

    def __str__(self, word, diary_date):
        self.keyword=word
        self.diary_date=diary_date
        return self.id
#
    # def __init__(self, keyword):
    #     self.keyword=keyword
    #     # return self.id
