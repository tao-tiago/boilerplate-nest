import { Injectable, Logger } from "@nestjs/common"
import Redis from "ioredis"

import { BaseStreamConsumer } from "@/core/infra/stream/stream.consumer"
import { StreamProducer } from "@/core/infra/stream/stream.producer"
import { IQueue, IQueuePayload } from "@/core/infra/stream/stream.types"

@Injectable()
export class NotificationConsumerB extends BaseStreamConsumer {
  protected QUEUE = "NOTIFICATION_B" as IQueue
  protected GROUP = "notification-group"
  protected CONSUMER = "consumer"

  private readonly logger = new Logger(NotificationConsumerB.name)

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
        queue: "NOTIFICATION_C",
        payload
      })

      this.logger.log("Consumer Service B processed a message", {
        correlationId: payload.correlationId,
        operation: "NotificationConsumerB.handleMessage"
      })
    } catch (error) {
      this.logger.error(error.message, {
        correlationId: payload.correlationId,
        operation: "NotificationConsumerB.handleMessage",
        stack: error.stack
      })
    }
  }

  private async callExternalService() {
    return new Promise((resolve) => setTimeout(resolve, 2500))
  }
}
