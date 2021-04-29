FROM node:alpine

EXPOSE 3000
WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install --pure-lockfile

COPY . /usr/src/app

RUN yarn api:build

CMD yarn api:start
