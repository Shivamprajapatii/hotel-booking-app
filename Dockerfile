# Build stage
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /wonderlust-app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY . .


# Production stage
FROM node:20-alpine AS production

# Create app directory
WORKDIR /wonderlust-app

# Copy built application from builder stage
COPY --from=builder /wonderlust-app/package*.json ./
COPY --from=builder /wonderlust-app/node_modules ./node_modules
COPY --from=builder /wonderlust-app/public ./public

# Expose port
EXPOSE 3000



# Add health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:8080', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

CMD ["node", "app.js"]