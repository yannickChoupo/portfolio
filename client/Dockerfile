FROM node:18-alpine as build-stage

WORKDIR /usr/src/app

# Accept PUBLIC_URL as build argument
ARG PUBLIC_URL=/portfolio
ENV PUBLIC_URL=$PUBLIC_URL

COPY package*.json ./

RUN npm install

COPY ./ ./

RUN npm run build

# Stage 2: Nginx
FROM nginx:alpine

COPY --from=build-stage /usr/src/app/build/ /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]