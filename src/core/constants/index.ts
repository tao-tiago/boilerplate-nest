// Redis configuration
export const REDIS_HOST = process.env.REDIS_HOST || "localhost"
export const REDIS_PORT = Number(process.env.REDIS_PORT) || 6379
export const REDIS_DB = Number(process.env.REDIS_DB) || 0

export const NODE_ENV = process.env.NODE_ENV || "development"
