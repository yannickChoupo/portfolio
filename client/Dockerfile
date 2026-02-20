FROM node:20-alpine AS build-stage

WORKDIR /usr/src/app

# Accept PUBLIC_URL as build argument
ARG PUBLIC_URL=/
ARG REACT_APP_API_URL=/api
ENV PUBLIC_URL=$PUBLIC_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

COPY package*.json ./

RUN npm install

COPY ./ ./

RUN npm run build

# Stage 2: Nginx
FROM nginx:alpine

COPY --from=build-stage /usr/src/app/build/ /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]