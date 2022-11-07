FROM node:14.15.2-alpine

WORKDIR /

COPY . .

RUN npm install

# Development
CMD ["npm", "run", "start:dev"]

# Production
# RUN npm install -g pm2
# CMD ["pm2-runtime", "ecosystem.config.js", "--env", "production"]
