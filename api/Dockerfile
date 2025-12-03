# =============================================================================
# Cognia API Dockerfile
# =============================================================================
# Multi-stage build for both development and production environments
# =============================================================================

# -----------------------------------------------------------------------------
# Stage 1: Base image with dependencies
# -----------------------------------------------------------------------------
FROM node:20-alpine AS base

# Install system dependencies required for native modules
RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

# Copy package files for dependency installation
COPY package.json package-lock.json ./

# -----------------------------------------------------------------------------
# Stage 2: Development dependencies
# -----------------------------------------------------------------------------
FROM base AS deps

# Install all dependencies including devDependencies
RUN npm ci

# -----------------------------------------------------------------------------
# Stage 3: Production dependencies only
# -----------------------------------------------------------------------------
FROM base AS prod-deps

# Install only production dependencies
RUN npm ci --only=production

# -----------------------------------------------------------------------------
# Stage 4: Build stage
# -----------------------------------------------------------------------------
FROM base AS builder

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy source code and configuration files
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build TypeScript to JavaScript
RUN npm run build

# -----------------------------------------------------------------------------
# Stage 5: Development runtime
# -----------------------------------------------------------------------------
FROM base AS development

WORKDIR /app

# Copy dependencies
COPY --from=deps /app/node_modules ./node_modules

# Copy source code
COPY . .

# Generate Prisma client for development
RUN npx prisma generate

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# Start development server with nodemon
CMD ["npm", "run", "start"]

# -----------------------------------------------------------------------------
# Stage 6: Production runtime
# -----------------------------------------------------------------------------
FROM node:20-alpine AS production

WORKDIR /app

# Install system dependencies
RUN apk add --no-cache libc6-compat openssl

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 cognia

# Copy production dependencies
COPY --from=prod-deps /app/node_modules ./node_modules

# Copy built application
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./

# Copy Prisma generated client
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Create logs directory
RUN mkdir -p logs && chown -R cognia:nodejs logs

# Set ownership
RUN chown -R cognia:nodejs /app

# Switch to non-root user
USER cognia

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# Start production server
CMD ["node", "dist/App.js"]
