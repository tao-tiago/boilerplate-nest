export type IQueue =
  | "NOTIFICATION_A"
  | "NOTIFICATION_B"
  | "NOTIFICATION_C"
  | "AUDITORY_MAIN"
  | "AUDITORY_PROCESSING"
  | "AUDITORY_AGGREGATION"

export type IQueuePayload<T> = {
  correlationId: string
} & T

export type IQueueArgs<T> = {
  queue: IQueue
  payload: IQueuePayload<T>
}

export type IParseMessage = Array<[string, string[]]>
export type IParseConsumer = Array<[string, IParseMessage]>
