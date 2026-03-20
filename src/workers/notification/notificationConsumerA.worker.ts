import { Injectable } from "@nestjs/common"
import Redis from "ioredis"

import { LoggerService } from "@/core/infra/log/logger.service"
import { BaseStreamConsumer } from "@/core/infra/stream/stream.consumer"
import { StreamProducer } from "@/core/infra/stream/stream.producer"
import { IQueue, IQueuePayload } from "@/core/infra/stream/stream.types"

@Injectable()
export class NotificationConsumerA extends BaseStreamConsumer {
  protected QUEUE = "NOTIFICATION_A" as IQueue
  protected GROUP = "notification-group"
  protected CONSUMER = "consumer"

  constructor(
    public readonly stream: Redis,
    private readonly streamProducer: StreamProducer,
    private readonly logger: LoggerService
  ) {
    super(stream)
  }

  async handleMessage(payload: IQueuePayload<unknown>) {
    try {
      await this.callExternalService()

      await this.streamProducer.publish({
        queue: "NOTIFICATION_B",
        payload
      })

      this.logger.log({
        correlationId: payload.correlationId,
        operation: "NotificationConsumerA.handleMessage",
        message: "Consumer Service A processed a message"
      })
    } catch (error) {
      this.logger.error({
        correlationId: payload.correlationId,
        operation: "NotificationConsumerA.handleMessage",
        message: error.message,
        stack: error.stack
      })

      throw error
    }
  }

  private async callExternalService() {
    return new Promise((resolve) => setTimeout(resolve, 5000))
  }
}
