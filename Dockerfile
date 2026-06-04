# Production stage
FROM node:20-alpine

# Set working directory
WORKDIR /wonderlust-app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --omit=dev 

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "app.js"]