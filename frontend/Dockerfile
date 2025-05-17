FROM node:24-alpine3.20

WORKDIR /app

COPY package.json package-lock.json .

RUN npm ci

COPY . .

CMD ["npm", "run", "dev"]
