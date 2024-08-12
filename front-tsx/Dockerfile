FROM node:20-alpine
WORKDIR /app
#przetestuj usuniecie /
COPY package*.json ./
RUN npm install
COPY . .

CMD ["npm", "start"]