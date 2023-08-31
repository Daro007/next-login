FROM node:18

WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

RUN npm install

# Copy the rest of the application code into the container
COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
