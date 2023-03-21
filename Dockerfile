FROM node:16-alpine3.17
WORKDIR /usr/app
COPY package.json .
RUN yarn install
COPY . .

EXPOSE 3500
CMD ["yarn", "dev"]