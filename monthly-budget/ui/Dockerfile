FROM registry.hub.docker.com/library/node:10.11-slim

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
    apt-get update && apt-get install -y google-chrome-stable && \
    apt-get update && apt-get install -y bzip2 && \
    apt-get update && apt-get install -y zip && \
    rm -rf /var/lib/apt/lists/*

RUN npm install -g @angular/cli

WORKDIR /usr/src/app

RUN rm -rf node_modules

ADD package*.json ./

EXPOSE 4200

RUN npm install

ADD . ./

ENTRYPOINT [ "npm", "start" ]
# FROM nexus-docker.liberty.edu:5000/lu/headless-chrome:latest

# RUN npm install -g @angular/cli

# WORKDIR /usr/src/app

# RUN rm -rf node_modules

# COPY registration-ui/package*.json ./

# RUN npm install

# COPY registration-ui/ ./
