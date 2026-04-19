FROM node:24-slim

RUN apt-get update && apt-get install -y cron \
    && rm -rf /var/lib/apt/lists/*
RUN apt-get update && apt-get install -y nano \
    && rm -rf /var/lib/apt/lists/*
    
COPY crontab /etc/cron.d/app-cron
RUN chmod 0644 /etc/cron.d/app-cron
RUN touch /var/log/cron.log
RUN sed -i 's/\r$//' /etc/cron.d/app-cron
RUN crontab /etc/cron.d/app-cron
WORKDIR /var/www/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000

# CMD ["node", "src/index.js"]