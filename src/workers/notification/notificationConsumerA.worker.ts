import { Injectable, Logger } from "@nestjs/common"
import Redis from "ioredis"

import { BaseStreamConsumer } from "@/core/infra/stream/stream.consumer"
import { StreamProducer } from "@/core/infra/stream/stream.producer"
import { IQueue, IQueuePayload } from "@/core/infra/stream/stream.types"

@Injectable()
export class NotificationConsumerA extends BaseStreamConsumer {
  protected QUEUE = "NOTIFICATION_A" as IQueue
  protected GROUP = "notification-group"
  protected CONSUMER = "consumer"

  private readonly logger = new Logger(NotificationConsumerA.name)

  constructor(
    public readonly stream: Redis,
    private readonly streamProducer: StreamProducer
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

      this.logger.log("Consumer Service A processed a message", {
        correlationId: payload.correlationId,
        operation: "NotificationConsumerA.handleMessage"
      })
    } catch (error) {
      this.logger.error(error.message, {
        correlationId: payload.correlationId,
        operation: "NotificationConsumerA.handleMessage",
        stack: error.stack
      })

      throw error
    }
  }

  private async callExternalService() {
    return new Promise((resolve) => setTimeout(resolve, 5000))
  }
}
