# frontend/Dockerfile
# Use Node.js 22 to satisfy Vite requirement
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "run", "dev", "--", "--host"]
