FROM node:alpine
WORKDIR /app
COPY package.json ./
RUN npm i --force
COPY . ./
EXPOSE 8080
CMD [ "npm", "run", "dev"]
