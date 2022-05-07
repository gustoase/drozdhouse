#FROM node:16-alpine3.14 as development
#
#WORKDIR /app
#COPY package.json ./
#
#RUN npm install glob rimraf
#RUN npm install
#
#COPY ./src .
#
#RUN npm run build

FROM node:16-alpine3.14 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app
COPY package.json ./

RUN npm install

COPY . .

RUN npm run build
COPY ./dist .

CMD ["node", "dist/main"]
