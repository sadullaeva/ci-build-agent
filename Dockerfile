FROM node:12

WORKDIR /usr/src/build-agent

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE ${PORT}

CMD ["node", "index.js"]