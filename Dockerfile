FROM node:18-alpine as builder

WORKDIR /usr/src/app

RUN chown -R node:node /usr/src/app

USER node

COPY ./src ./src
COPY ./package.json ./package.json
COPY ./tsconfig.json ./tsconfig.json

RUN npm install --ignore-scripts

COPY ./start.sh ./start.sh

EXPOSE 37001

CMD ["sh","start.sh"]