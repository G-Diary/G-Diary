# pull official base image
# 우분투
FROM python:3.8.5
#FROM python:3.10-slim-bullseye
USER root 
# environment 환경변수 지정, 컨테이너 안에서 실행중일 때 사용가능
# ex) django의 settings.py에서 secret_key = os.getenv('SECRET_KEY', 'foo')
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# WORKDIR : working directory 작업경로 
WORKDIR /backend
# COPY : 호스트 컴퓨터(로컬)에서 requirements.txt를 
# 복사해서 도커 컨테이너의 backend 폴더에 넣겠다.

COPY requirements.txt /backend/ 

RUN apt-get update && apt-get install -y python3-pip libffi-dev python3-dev && apt-get install -y default-libmysqlclient-dev && apt-get install -y default-jdk 
# RUN apt-get install -y default-jdk 
# 리눅스 명령어를 실행하겠다 alpine : apk, ubuntu : sudo
# 연결하기 위한 드라이버를 깔았다고 생각하면 된다.
RUN pip install --upgrade pip
RUN pip install -r requirements.txt


COPY . /backend/

