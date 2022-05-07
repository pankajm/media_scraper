FROM node:stretch-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk update && apk add bash

RUN npm install

COPY . .

EXPOSE 80
CMD ["npm", "start"]
