# build
FROM node:10.15.3 as builder

WORKDIR /usr/src/app

COPY ["package.json", "yarn.lock", "craco.config.js", "./"]

RUN yarn install

COPY . .

RUN yarn build

# run
FROM nginx:1.17-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/build /app/build
