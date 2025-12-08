export type Logger = {
  correlationId: string
  service: string
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

export const loggerContext: Partial<Logger> = {}
