FROM node:20-alpine AS build-stage

WORKDIR /usr/src/app

# Accept PUBLIC_URL as build argument
ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL

COPY package*.json ./

RUN npm install

COPY ./ ./

RUN npm run build

# Stage 2: Nginx
FROM nginx:alpine

COPY --from=build-stage /usr/src/app/dist/ /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]