FROM node
WORKDIR /development/nodejs/notification-service
COPY . .
RUN npm install nodemon
RUN npm ci
CMD ["npx", "nodemon","./src"]