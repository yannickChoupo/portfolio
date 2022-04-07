# Dockerfile for React client

# Build express server
FROM node:16

# Create app directory
RUN mkdir -p /usr/src/app

# Working directory be app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/

## Installing dependencies
RUN npm install

# copy local files to app folder
COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]

