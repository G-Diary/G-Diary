from django.db import models

class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, null=False)
    updated_at = models.DateTimeField(auto_now=True, null=False)
    is_deleted = models.BooleanField(default=False, null=False)

    class Meta:
        abstract=True # 이 모델은 데이터베이스 테이블을 만드는데 사용되지 않겠다.

class User(BaseModel):
    id = models.AutoField(primary_key=True) #pk
    email = models.EmailField(max_length=50, null=False)
    nickname = models.CharField(max_length=10, null=False)
    cover_image_url = models.CharField(max_length=500, null=False)


    def __str__(self):
        return self.id

class Diary(BaseModel):
    id = models.AutoField(primary_key=True) #pk
    #user_id = models.ForeignKey(User, on_delete=models.CASCADE, null=False) #fk 회원가입 api 완료되면 주석 풀기
    title = models.CharField(max_length=50, null=False)
    weather = models.IntegerField(null=True)
    drawing_url = models.CharField(max_length=500, null=False)
    contents = models.CharField(max_length=50, null=False)
    diary_date = models.DateField(null=False)
 

    def __str__(self):
        return self.id


class Keyword(BaseModel):
    keyword = models.CharField(max_length=10, null=False) #pk

    def __str__(self):
        return self.keyword

class Drawing(BaseModel):
    id = models.AutoField(primary_key=True) #pk
    keyword = models.ForeignKey(Keyword, on_delete=models.CASCADE, null=False) #fk
    image_url = models.CharField(max_length=500, null=False)

    def __str__(self):
        return self.id