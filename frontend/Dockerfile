# Step 1: Build the React application
FROM node:18 AS build

# Set the working directory
WORKDIR /app/frontend

# Install dependencies
COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

# Copy the rest of the source code
COPY ./ ./

# Build the app for production
RUN npm run build

# Step 2: Serve the app using NGINX
FROM nginx:alpine

# Copy the built React app from the build stage
COPY --from=build /app/frontend/dist /usr/share/nginx/html

# Expose port 80 to access the app
EXPOSE 80

# Start NGINX to serve the app
CMD ["nginx", "-g", "daemon off;"]
