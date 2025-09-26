FROM node:22.14-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:22-alpine AS application

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY --from=build /app/build /app/build

CMD ["node", "./build/index.js"]