FROM node:16-alpine3.17
WORKDIR /usr/app
COPY package.json .

ARG NODE_ENV
RUN if [ "$NODE_ENV" = production ]; \
        then yarn install --production; \
        else yarn install; \
        fi


COPY . .

EXPOSE 3500
CMD ["yarn", "build"]