FROM node:latest

WORKDIR /app

COPY . .

RUN npm install

# ENV PORT=3000
# ENV DATABASE_HOST=host.docker.internal
# ENV DATABASE_PORT=5432
# ENV DATABASE_USERNAME=postgres
# ENV DATABASE_PASSWORD=postgres
# ENV DATABASE_NAME=guialocal
# ENV GOOGLE_AUTH_URI=https://accounts.google.com/o/oauth2/v2/auth?scope=email&include_granted_scopes=true&response_type=token&state=state_parameter_passthrough_value&redirect_uri=http://localhost:3001&client_id=975758659668-65l4an4t4tbha9g5bian8dbp85nqspm6.apps.googleusercontent.com
# ENV GOOGLE_API_KEY=AIzaSyBIBkZEexyq3td0QPGZHb9B_-s7-wm6y6I

CMD [ "node", "src/index.js" ]