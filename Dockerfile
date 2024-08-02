FROM node:latest

# Defina os argumentos de build
ARG DISCORD_TOKEN
ARG DISCORD_CLIENT_ID

# Crie e copie o arquivo .env
RUN echo "DISCORD_TOKEN=$DISCORD_TOKEN" >> /app/.env
RUN echo "DISCORD_CLIENT_ID=$DISCORD_CLIENT_ID" >> /app/.env

WORKDIR /app

COPY . .

RUN npm install

CMD [ "node", "src/index.js" ]