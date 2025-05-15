# STEP 1: Build the React app
FROM node:18 AS build

WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm install

# Copy source and build it
COPY . .
RUN npm run build

# STEP 2: Serve using nginx
FROM nginx:alpine

# Copy built files from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port nginx will serve on
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
