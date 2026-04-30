export type ILogger = {
  correlationId: string
  service: string
  payload: unknown
  operation: string
  status: number
  method: string
  path: string
  stack: unknown
  timestamp: string
}

export const loggerContext: Partial<ILogger> = {
  service: "service-api"
}
