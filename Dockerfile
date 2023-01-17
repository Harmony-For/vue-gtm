FROM node:alpine
ARG NPM_TOKEN

WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install typescript -g
COPY ./ /app
# VOLUME "./:/app"

# Docker環境の立ち上げ方
# ビルド: docker build -t (任意のタグ名) .
# Shellへ: docker run -v  /home/ec2-user/vue-gtm/:/app -it (任意のタグ名) sh