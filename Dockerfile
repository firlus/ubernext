FROM node:lts
WORKDIR /app/data
COPY yarn.lock .
COPY package.json .
WORKDIR /app
COPY entrypoint.sh .
RUN chmod 775 entrypoint.sh