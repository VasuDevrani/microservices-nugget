FROM node:14-alpine

WORKDIR /app/products

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5001

# Start the app
CMD ["npm", "start"]