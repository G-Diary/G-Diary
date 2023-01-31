from django.db import models
from django.contrib.auth.base_user import BaseUserManager, AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin

class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, null=False)
    updated_at = models.DateTimeField(auto_now=True, null=False)
    is_deleted = models.BooleanField(default=False, null=False)

    class Meta:
        abstract=True # 이 모델은 데이터베이스 테이블을 만드는데 사용되지 않겠다.

class UserManager(BaseUserManager):
    
    def create_user(self, email, nickname, password=None):
        if not email:
            raise ValueError('must have user email')
        
        user = self.model(
            email=self.normalize_email(email),
            nickname = nickname,
        )
        user.set_password(password) 
        user.save(using=self._db)
        return user

    def create_superuser(self, email = None, nickname=None, password=None):
        superuser = self.create_user(
            email=email,
            password=password,
            nickname=nickname
        )

        superuser.is_admin = True
        superuser.is_staff = True
        superuser.is_superuser = True
        superuser.is_active = True
        superuser.save(using=self._db)

        return superuser


class User(AbstractBaseUser, PermissionsMixin, BaseModel):
    id = models.AutoField(primary_key=True)  # pk

    email = models.EmailField(default='', max_length=100, null=False, unique=True)
    nickname = models.CharField(max_length=10, null=False, unique=True)

    cover_image_url=models.CharField(max_length=500, null= False, default="https://gdiary-s3-bucket.s3.ap-northeast-2.amazonaws.com/mainLogo.png")

    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = UserManager()

    #이메일로 로그인
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    
    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin

    def __str__(self):
        return self.id

class Diary(BaseModel):
    id = models.AutoField(primary_key=True) #pk
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, null=False) #fk
    title = models.CharField(max_length=50, null=False)
    weather = models.IntegerField(null=False)
    emoji = models.CharField(max_length=500, null=False)
    drawing_url = models.CharField(max_length=500, null=True)
    contents = models.CharField(max_length=50, null=False)
    diary_date = models.DateField(null=False)

    def __str__(self):
        return self.id


class Keyword(BaseModel):
    keyword = models.CharField(primary_key=True, max_length=10, null=False) #pk

    def __str__(self):
        return self.keyword

# class Result(models.Model):
#     id = models.AutoField(primary_key=True) #pk
#     diary_id = models.ForeignKey(Diary, on_delete=models.CASCADE, null=False)
#     keyword = models.CharField(max_length=10, null=False)

#     def __str__(self):
#         return self.id

class Drawing(BaseModel):
    id = models.AutoField(primary_key=True) #pk
    keyword = models.ForeignKey(Keyword, on_delete=models.CASCADE, null=False) #fk
    image_url = models.CharField(max_length=500, null=False)

    def __str__(self):
        return str(self.image_url)

