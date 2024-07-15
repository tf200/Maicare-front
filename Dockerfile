FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the app
COPY . .

# Build the app
RUN npm run build

VOLUME [ "/app" ]

EXPOSE 3000

CMD npm run start