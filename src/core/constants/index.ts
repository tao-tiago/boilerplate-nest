// App environment
export const NODE_ENV = process.env.NODE_ENV || "development"

// JWT configuration
export const JWT_SECRET = process.env.JWT_SECRET || "default"
export const JWT_EXPIRATION = Number(process.env.JWT_EXPIRATION) || 3600

// Redis configuration
export const REDIS_HOST = process.env.REDIS_HOST || "localhost"
export const REDIS_PORT = Number(process.env.REDIS_PORT) || 6379
export const REDIS_DB = Number(process.env.REDIS_DB) || 0
