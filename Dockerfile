FROM node:12-alpine

RUN mkdir -p /app
WORKDIR /app

COPY . /app
RUN cp .env.production .env
RUN yarn install
RUN yarn build

EXPOSE 8080

CMD [ "yarn", "start" ]
