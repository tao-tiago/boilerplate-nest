import { RedisValue } from "ioredis"

export type IQueue =
  | "NOTIFICATION_A"
  | "NOTIFICATION_B"
  | "NOTIFICATION_C"
  | "AUDITORY_MAIN"
  | "AUDITORY_PROCESSING"
  | "AUDITORY_AGGREGATION"
export type IGroups = string

export type IQueuePayload = {
  type: string
  correlationId: string
} & Record<string, RedisValue>

export type IQueueArgs = {
  queue: IQueue
  payload: IQueuePayload
}

export type IParseMessage = Array<[string, string[]]>
export type IParseConsumer = Array<[string, IParseMessage]>
