FROM node:16-alpine3.14 as development

WORKDIR /app
COPY package*.json ./

RUN npm install glob rimraf
RUN npm install

COPY . .

RUN npm run build

FROM node:16-alpine3.14 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app
COPY package*.json ./

COPY . .
COPY --from=development /app/dist ./dist

CMD ["node", "dist/main"]
