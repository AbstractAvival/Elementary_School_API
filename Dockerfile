FROM node:20.11.1-alpine3.18

WORKDIR /app

COPY package-lock.json package.json /
RUN npm install

CMD ["node", "server.js"]
