FROM node:18.17-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy app source code
COPY . .

RUN npm install



