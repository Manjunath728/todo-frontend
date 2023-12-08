# Stage 1: Build React app
FROM node:18.17.1-alpine as builder

WORKDIR /usr/src/app

COPY package*.json ./

# Installing dependencies and building the app
RUN npm install --silent
COPY . .
RUN npm run build

# Stage 2: Use Nginx to serve the built app
FROM nginx:latest

# Copy the built app from the previous stage
COPY --from=builder /usr/src/app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# The CMD is inherited from the nginx base image and is used to start Nginx
