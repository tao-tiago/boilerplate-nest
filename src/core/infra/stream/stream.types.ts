import { RedisValue } from "ioredis"

export type IStreamKey = "NOTIFICATION_EVENTS"
export type ITypes = "product.created"

type IStreamProduct = {
  streamKey: IStreamKey
  payload: {
    type: ITypes
  } & Record<string, RedisValue>
}

export type IStreamArgs = IStreamProduct

export type IParseMessagePayload = Array<[string, Array<[string, string[]]>]>
