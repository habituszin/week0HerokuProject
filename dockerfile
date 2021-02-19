FROM node:alpine3.10
WORKDIR /app
RUN npm install express mysql dotenv
COPY server.js ./
EXPOSE 3306
CMD ["node", "server.js"]
