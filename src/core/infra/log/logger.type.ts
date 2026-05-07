export type ILoggerRequired = {
  correlationId: string
  service: string
}

export type ILogger = {
  payload: unknown
  operation: string
  status: number
  method: string
  path: string
  stack: unknown
  timestamp: string
}

export type ILoggerNormalize = Partial<ILoggerRequired & ILogger>
