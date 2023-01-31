from django.db import models

from gdiary.models import Diary


class Result(models.Model):
    id = models.AutoField(primary_key=True) #pk
    # diary_id = models.ForeignKey(Diary, on_delete=models.CASCADE, null=False) #fk
    keyword = models.CharField(max_length=10, null=False)

    def __str__(self):
        return self.id
#
    # def __init__(self, keyword):
    #     self.keyword=keyword
    #     # return self.id
