# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Nest.js dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Expose the port your application is running on
EXPOSE 3000

# Define the command to run your application
CMD [ "npm", "start" ]
