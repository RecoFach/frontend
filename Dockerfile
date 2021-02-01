# base image
FROM node:lts-alpine

# install smth for serving static content
RUN npm install -g serve

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install

# copy source files
COPY . .

# api for backend url & url
ARG api_url
ENV VUE_APP_API_URL=$api_url

ARG api_port
ENV VUE_APP_API_PORT=$api_port

# api for recomendation service url & port
ARG reco_url
ENV VUE_APP_RECO_URL=$reco_url

ARG reco_port
ENV VUE_APP_RECO_PORT=$reco_port

# fix linting
RUN yarn run lint --fix

# build app
RUN yarn build

# run app
EXPOSE 3000
CMD [ "serve", "-l", "3000", "-s", "dist" ]
