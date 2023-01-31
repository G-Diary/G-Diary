from django.db import models
class Diary(models.Model):
    diary_id = models.IntegerField
    title = models.CharField(max_length=50)
    contents = models.TextField(max_length=50)
    is_deleted = models.BooleanField

    def __init__(self):
        return self.diary_id