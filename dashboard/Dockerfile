# Use the official Node.js 16 image as the base image
FROM node:18

# Set the working directory in the container to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Build the application
RUN npm run build

# Expose the port that the application will listen on
EXPOSE 8000

# Start the application with npm when the container starts
CMD ["npm", "start"]
