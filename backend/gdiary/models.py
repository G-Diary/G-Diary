from django.db import models

class User(models.Model):
    id = models.AutoField(primary_key=True) #pk
    email = models.EmailField(max_length=50, null=False)
    nickname = models.CharField(max_length=10, null=False)
    password = models.CharField(null=False)
    cover_image_url = models.CharField(max_length=500, null=False)
    created_at = models.DateTimeField(auto_now_add=True, null=False)
    updated_at = models.DateTimeField(auto_now=True, null=False)
    is_deleted = models.BooleanField(null=False)

    def __str__(self):
        return self.id

class Diary(models.Model):
    id = models.AutoField(primary_key=True) #pk
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, null=False) #fk
    title = models.CharField(max_length=50, null=False)
    weather = models.IntegerField
    drawing_url = models.CharField(max_length=500, null=False)
    contents = models.CharField(max_length=50, null=False)
    diary_date = models.DateField(null=False)
    created_at = models.DateTimeField(auto_now_add=True, null=False)
    updated_at = models.DateTimeField(auto_now=True, null=False)
    is_deleted = models.BooleanField(null=False)

    def __str__(self):
        return self.id


class Keyword(models.Model):
    id = models.AutoField(primary_key=True) #pk
    keyword = models.CharField(max_length=10, null=False)
    created_at = models.DateTimeField(auto_now_add=True, null=False)
    updated_at = models.DateTimeField(auto_now=True, null=False)
    is_deleted = models.BooleanField(null=False)

    def __str__(self):
        return self.keyword

class Drawing(models.Model):
    id = models.AutoField(primary_key=True) #pk
    keyword = models.ForeignKey(Keyword, on_delete=models.CASCADE, null=False) #fk
    image_url = models.CharField(max_length=500, null=False)
    created_at = models.DateTimeField(auto_now_add=True, null=False)
    updated_at = models.DateTimeField(auto_now=True, null=False)
    is_deleted = models.BooleanField(null=False)

    def __str__(self):
        return self.id