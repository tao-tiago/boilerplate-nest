export const loggerContext = {
  correlationId: crypto.randomUUID(),
  cacheHit: false,
  service: "service-api"
}

export type Logger = typeof loggerContext & {
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
