export const logger = {
  correlationId: crypto.randomUUID(),
  cacheHit: false,
  service: "mobility-api"
}

export type Logger = typeof logger & {
  payload: unknown
  operation: string
  status: number
  message: string[]
  errorMessage: unknown
  method: string
  path: string
  stack: unknown
  timestamp: string
}
