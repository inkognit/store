FROM node:18
ENV "PORT"='3001'
ENV "SALT"='jsf5f4er3ds4f2(54256hqasdu6*20q#%!hq(*3(*!&%GDWKH23'
ENV "JWT_SECRET"="m*8&7Ge#fHgxUDWBrX^m*X^m*8&7Ge#F!cJs)Z2Y"
ENV "DB_PORT"="9876"
ENV "DB_HOST"="192.168.61.71"
# ENV "DB_HOST"="0.0.0.0"
ENV "DB_USERNAME"="testadmin"
ENV "DB_PASSWORD"="verysecretpassword"
ENV "DB_NAME"="dockerstoredb"
WORKDIR /app
COPY package.json ./
COPY tsconfig.json ./
COPY src /app/src
COPY src/db/db.sql ./db
RUN ls -a
RUN npm i
RUN npm run build
COPY . .
EXPOSE 3001
# CMD ['npm', 'run', 'start:prod']
CMD [ "node", "./dist/main.js" ]