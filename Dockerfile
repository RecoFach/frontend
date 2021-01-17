# base image
FROM node:lts-alpine

# install simple http server for serving static content
RUN npm install -g http-server

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install

# copy source files
COPY . .

# api for backend url
ARG api_url
ENV VUE_APP_API_URL=$api_url

# api for backend port
ARG api_port
ENV VUE_APP_API_PORT=$api_port

# build app
RUN yarn bmodern

# run app
EXPOSE 3000
CMD [ "http-server", "dist", "--port", "3000" ]
