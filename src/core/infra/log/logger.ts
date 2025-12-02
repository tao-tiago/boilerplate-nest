export const loggerContext = {
  correlationId: crypto.randomUUID(),
  service: "service-api"
}

export type Logger = typeof loggerContext & {
  payload: unknown
  operation: string
  status: number
  message: string[]
  logMessage: string
  method: string
  path: string
  stack: unknown
  timestamp: string
}
