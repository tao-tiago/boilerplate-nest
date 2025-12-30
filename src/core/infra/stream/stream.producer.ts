import { Inject, Injectable } from "@nestjs/common"
import Redis from "ioredis"

import { STREAM } from "./stream.service"
import { IStreamArgs } from "./stream.types"

@Injectable()
export class StreamProducer {
  constructor(
    @Inject(STREAM)
    private readonly redis: Redis
  ) {}

  async publish({ streamKey, payload }: IStreamArgs) {
    const fields: string[] = []

    for (const [key, value] of Object.entries(payload)) {
      fields.push(key, String(value))
    }

    await this.redis.xadd(streamKey, "*", ...fields)
  }

  parseFields(fields: string[]): Record<string, string> {
    const result = {}

    for (let i = 0; i < fields.length; i += 2) {
      result[fields[i]] = fields[i + 1]
    }

    return result
  }
}
