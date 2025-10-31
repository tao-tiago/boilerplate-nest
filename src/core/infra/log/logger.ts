export const logger = {
  correlationId: crypto.randomUUID(),
  cacheHit: false
}

export type Logger = typeof logger & {
  service?: string
  payload?: unknown
  operation?: string
  status?: number
  message: string[]
  errorMessage?: unknown
  stack?: unknown
  timestamp: string
}
