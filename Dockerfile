FROM node:22.21-alpine3.21 AS build

WORKDIR /build

# Copy package and package-lock 
COPY package.json package-lock.json ./

# Clean install dependencies based package-lock
# Note: We also install dev deps as typeScript may be needed
RUN npm ci

# Copy files
# Use .dockerignore to avoid copying node_modules and others folders and files
COPY . .

# Build application
RUN npm run build

# =======================================
# Image generate dependencies production
# =======================================
FROM node:22.21-alpine3.21 AS production

WORKDIR /production

# Copy dependencies
COPY --from=build /build/package.json .
COPY --from=build /build/package-lock.json .
COPY --from=build /build/dist ./dist

# Clean install dependencies based package-lock
RUN npm ci --omit=dev

EXPOSE 3333

# Run app command
CMD ["dist/server.js"]