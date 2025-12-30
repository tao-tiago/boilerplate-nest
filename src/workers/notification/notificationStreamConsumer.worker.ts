import { Inject, Injectable, OnModuleInit } from "@nestjs/common"
import Redis from "ioredis"

import { StreamProducer } from "@/core/infra/stream/stream.producer"
import { STREAM } from "@/core/infra/stream/stream.service"
import { IParseMessagePayload, IStreamKey } from "@/core/infra/stream/stream.types"
import { WebSocketService } from "@/core/infra/websocket/webSocket.service"

@Injectable()
export class NotificationStreamConsumer implements OnModuleInit {
  private readonly STREAM_KEY = "NOTIFICATION_EVENTS" as IStreamKey
  private readonly GROUP = "notification-group"
  private readonly CONSUMER = "notification-service"

  constructor(
    @Inject(STREAM) private readonly redis: Redis,

    private readonly streamProducer: StreamProducer,
    private readonly webSocketService: WebSocketService
  ) {}

  async onModuleInit() {
    await this.createGroup()
    this.consume()
  }

  private async createGroup() {
    try {
      await this.redis.xgroup("CREATE", this.STREAM_KEY, this.GROUP, "0", "MKSTREAM")
    } catch (err) {
      if (!err.message.includes("BUSYGROUP")) {
        throw err
      }
    }
  }

  private async consume() {
    while (true) {
      const response = await this.redis.xreadgroup(
        "GROUP",
        this.GROUP,
        this.CONSUMER,
        "BLOCK",
        5000,
        "STREAMS",
        this.STREAM_KEY,
        ">"
      )

      if (!response) continue

      for (const [, messages] of response as IParseMessagePayload) {
        for (const [id, fields] of messages) {
          const data = this.streamProducer.parseFields(fields)

          await this.handleMessage(data)
          await this.redis.xack(this.STREAM_KEY, this.GROUP, id)
        }
      }
    }
  }

  private async handleMessage(data) {
    this.webSocketService.emit({
      webSocketKey: "product.created",
      payload: {
        productId: data.productId,
        productName: data.productName
      }
    })
  }
}
