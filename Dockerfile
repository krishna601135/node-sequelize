# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the contents of the dist directory into the /app directory
COPY dist/. .

# Expose port 5000
EXPOSE 5000

# Define the command to run the app
CMD ["node", "index.bundle.js"]

