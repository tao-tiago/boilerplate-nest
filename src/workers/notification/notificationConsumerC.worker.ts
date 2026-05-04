import { Injectable } from "@nestjs/common"
import Redis from "ioredis"

import { LoggerService } from "@/core/infra/log/logger.service"
import { BaseStreamConsumer } from "@/core/infra/stream/stream.consumer"
import { IQueue, IQueuePayload } from "@/core/infra/stream/stream.types"

@Injectable()
export class NotificationConsumerC extends BaseStreamConsumer {
  protected QUEUE = "NOTIFICATION_C" as IQueue
  protected GROUP = "notification-group"
  protected CONSUMER = "consumer"

  constructor(
    public readonly stream: Redis,
    private readonly logger: LoggerService
  ) {
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
