FROM node:20-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# Vite default port is 5173, but we want 3000 as per plan
CMD ["npm", "run", "dev", "--", "--port", "3000", "--host"]
