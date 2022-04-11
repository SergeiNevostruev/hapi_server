FROM node

WORKDIR /usr/src/app

COPY package*.json /usr/src/app
COPY package-lock.json /usr/src/app

RUN npm install

COPY . .

EXPOSE 8080
# EXPOSE 5432

CMD npm start
