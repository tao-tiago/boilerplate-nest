import { Inject, Injectable } from "@nestjs/common"
import Redis from "ioredis"

import { STREAM } from "./stream.service"
import { IQueueArgs } from "./stream.types"

@Injectable()
export class StreamProducer {
  constructor(
    @Inject(STREAM)
    private readonly stream: Redis
  ) {}

  async publish<T>({ queue, payload }: IQueueArgs<T>) {
    const fields: string[] = []

    for (const [key, value] of Object.entries(payload)) {
      fields.push(key, String(value))
    }

    await this.stream.xadd(queue, "*", ...fields)
  }

  async addProcess<T extends string | number | Buffer>(correlationId: string, process: T) {
    await this.stream.sadd(`process:${correlationId}:done`, process)
  }

  async getProcess(correlationId: string) {
    return await this.stream.smembers(`process:${correlationId}:done`)
  }
}
