# Use an official Node runtime as a parent image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of your app's source code
COPY . .

# Build your app
RUN npm run build

# Install serve to run the application
RUN npm install -g serve

# Command to run the app
CMD ["serve", "-s", "build", "-l", "3000"]

# Expose port 3000
EXPOSE 3000
