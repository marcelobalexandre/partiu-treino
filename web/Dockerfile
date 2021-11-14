FROM node:16.13

RUN mkdir /web
WORKDIR /web

COPY package.json /web
COPY yarn.lock /web

RUN yarn install
