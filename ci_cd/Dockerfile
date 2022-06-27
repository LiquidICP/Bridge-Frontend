FROM node:16.13.0-alpine as builder
WORKDIR /build
COPY package.json yarn.lock ./

RUN yarn

COPY . ./
RUN yarn build:dev

FROM nginx:alpine
COPY --from=0 /build/build/ /var/www/html/
CMD ["nginx","-g","daemon off;"]