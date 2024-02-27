# Use an official Node.js runtime as a parent image
FROM node:16-alpine

WORKDIR /app

#copy build folder to app directory
COPY dist app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install


#Expose to port
EXPOSE 5000

CMD ["node", "/app/index.bundle.js"]