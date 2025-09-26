FROM node:22.14-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . ./

ARG VITE_API_URL

RUN npm run build

FROM nginx:alpine AS frontend-server

WORKDIR /usr/app/html

COPY --from=build /usr/src/app/dist .
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]