# Dockerfile for React client

# Build react client
FROM node:lts-buster-slim

# Working directory be app
WORKDIR /app

COPY package*.json ./

## Installing dependencies
RUN npm install 

# copy local files to app folder

EXPOSE 3000

CMD ["npm","run","dev"]

