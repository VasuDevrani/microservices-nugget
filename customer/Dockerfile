FROM node:14-alpine

WORKDIR /app/customer

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5000

# Start the app
CMD ["npm", "start"]
