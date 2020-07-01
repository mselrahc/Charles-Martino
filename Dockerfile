FROM node:10
ARG MONGO_URL
ARG REDIS_HOST
ENV DB_URL $MONGO_URL
ENV REDIS_HOST $REDIS_HOST
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8000
CMD ["npm", "start"]
