import Redis from "ioredis"

import { REDIS_HOST, REDIS_PORT } from "@/core/constants"

export const STREAM = "STREAM"

export const StreamService = {
  provide: STREAM,
  useFactory: () => {
    return new Redis({
      host: REDIS_HOST,
      port: REDIS_PORT
    })
  }
}
