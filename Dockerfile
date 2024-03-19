# Use the official Node.js image as base
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY backend/package.json ./backend/

# Install backend dependencies
RUN cd backend && npm install

# Copy the backend source code to the working directory
COPY backend ./backend

# Copy package.json and package-lock.json to the working directory
COPY frontend/package.json ./frontend/

# Install frontend dependencies
RUN cd frontend && npm install

# Copy the frontend source code to the working directory
COPY frontend ./frontend

# Expose port 3000 for the backend server
EXPOSE 3000

# Command to run the backend server
CMD ["node", "backend/server.js"]
