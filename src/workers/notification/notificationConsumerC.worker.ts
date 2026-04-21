import { Injectable, Logger } from "@nestjs/common"
import Redis from "ioredis"

import { BaseStreamConsumer } from "@/core/infra/stream/stream.consumer"
import { IQueue, IQueuePayload } from "@/core/infra/stream/stream.types"

@Injectable()
export class NotificationConsumerC extends BaseStreamConsumer {
  protected QUEUE = "NOTIFICATION_C" as IQueue
  protected GROUP = "notification-group"
  protected CONSUMER = "consumer"

  private readonly logger = new Logger(NotificationConsumerC.name)

  constructor(public readonly stream: Redis) {
    super(stream)
  }

  async handleMessage(payload: IQueuePayload<unknown>) {
    try {
      await this.callExternalService()

      this.logger.log("Consumer Service C processed a message", {
        correlationId: payload.correlationId,
        operation: "NotificationConsumerC.handleMessage"
      })
    } catch (error) {
      this.logger.error(error.message, {
        correlationId: payload.correlationId,
        operation: "NotificationConsumerC.handleMessage",
        stack: error.stack
      })
    }
  }

  private async callExternalService() {
    return new Promise((resolve) => setTimeout(resolve, 1000))
  }
}
