FROM node:20-alpine

ENV PORT=3000

WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the app
COPY . .

# Build the app
RUN npm run build

VOLUME [ "/app" ]

EXPOSE ${PORT}

HEALTHCHECK --interval=25s --timeout=30s --start-period=60s --retries=5 CMD curl -I http://127.0.0.1:${PORT}/signin | grep -q "200 OK" || exit 1

CMD npm run start