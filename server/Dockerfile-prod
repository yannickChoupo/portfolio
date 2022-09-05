# Dockerfile for React client

# Build express server
FROM node:lts-buster-slim

# Working directory be app
WORKDIR /usr/src/app

COPY package*.json ./

# Installing dependencies
RUN npm install

# copy local files to app folder
COPY . .

EXPOSE 5000

CMD ["npm","run","start"]