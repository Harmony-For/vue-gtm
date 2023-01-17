FROM node:alpine
ARG NPM_TOKEN

WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install typescript -g
COPY ./ /app
# VOLUME "./:/app"