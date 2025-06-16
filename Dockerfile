# Use the official Node.js LTS image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package files first to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port your app runs on (change if needed)
EXPOSE 7860

# Command to run your app
CMD ["node", "index.js"]