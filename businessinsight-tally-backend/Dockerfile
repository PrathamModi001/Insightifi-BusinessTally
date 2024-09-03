FROM node:alpine
RUN apk update && apk add bash
RUN node -v
RUN npm -v
WORKDIR /code
COPY package.json .
RUN npm install
COPY . /code/
