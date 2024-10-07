FROM node:20.15

WORKDIR /begoneia

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]