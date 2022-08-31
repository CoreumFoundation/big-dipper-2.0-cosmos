FROM node:16.17.0-alpine

ENV PORT 3000

# Install git for ui and internal packages
RUN apk add --no-cache git

# Set app directory
WORKDIR /app

# Add PM2
RUN npm install pm2 -g

# Installing dependencies
COPY package*.json ./
RUN npm ci

# Copying source files
COPY . .

# Building app
RUN npm run build
EXPOSE ${PORT}

# Running the app
CMD ["pm2-runtime", "dist/index.js"]
