import { Inject, Logger, OnModuleInit } from "@nestjs/common"
import redis from "ioredis"

import { STREAM } from "./stream.service"
import { IGroups, IParseConsumer, IParseMessage, IQueue, IQueuePayload } from "./stream.types"

export abstract class BaseStreamConsumer implements OnModuleInit {
  protected abstract QUEUE: IQueue
  protected abstract GROUP: IGroups
  protected abstract CONSUMER: string

  protected BLOCK_TIME = 5000
  protected IDLE_TIME = 5000
  protected BATCH_SIZE = 5

  constructor(
    @Inject(STREAM)
    readonly stream: redis
  ) {}

  async onModuleInit() {
    await this.createGroup()
    this.consume()
  }

  private async createGroup() {
    try {
      await this.stream.xgroup("CREATE", this.QUEUE, this.GROUP, "$", "MKSTREAM")
    } catch (error) {
      if (!error.message.includes("BUSYGROUP")) throw error
    } finally {
      Logger.log(`Stream Consumer Group ${this.GROUP} for stream ${this.QUEUE} is ready.`)
    }
  }

  private async consume() {
    while (true) {
      const message = (await this.stream.xreadgroup(
        "GROUP",
        this.GROUP,
        this.CONSUMER,
        "BLOCK",
        this.BLOCK_TIME,
        "STREAMS",
        this.QUEUE,
        ">"
      )) as IParseConsumer | null

      if (message) {
        await this.processMessage(message[0][1])
      }

      await this.retryPending()
    }
  }

  private async retryPending() {
    const minIdleTime = 10000
    const claimed = (await this.stream.xautoclaim(
      this.QUEUE,
      this.GROUP,
      this.CONSUMER,
      minIdleTime,
      "0-0"
    )) as [string, IParseMessage]

    const [_, message] = claimed

    if (message.length > 0) {
      await this.processMessage(message)
    }
  }

  private async processMessage(response: IParseMessage) {
    for (const [id, fields] of response) {
      try {
        const data = this.parseFields(fields)

        await this.handleMessage({
          ...data,
          id
        })

        await this.stream.xack(this.QUEUE, this.GROUP, id)
      } catch (error) {
        await this.stream.xclaim(this.QUEUE, this.GROUP, this.CONSUMER, this.IDLE_TIME, id)
      }
    }
  }

  private parseFields(fields: string[]): IQueuePayload {
    return fields.reduce<IQueuePayload>((acc, _, i, arr) => {
      if (i % 2 === 0) acc[arr[i]] = arr[i + 1]
      return acc
    }, {} as IQueuePayload)
  }

  protected abstract handleMessage(data: IQueuePayload): Promise<void>
}
