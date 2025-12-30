import { Inject, Injectable } from "@nestjs/common"
import Redis from "ioredis"

import { LoggerService } from "@/core/infra/log/logger.service"
import { BaseStreamConsumer } from "@/core/infra/stream/stream.consumer"
import { STREAM } from "@/core/infra/stream/stream.service"
import { IGroups, IQueue, IQueuePayload } from "@/core/infra/stream/stream.types"

@Injectable()
export class NotificationConsumerC extends BaseStreamConsumer {
  protected QUEUE = "NOTIFICATION_C" as IQueue
  protected GROUP = "notification-group-c" as IGroups
  protected CONSUMER = "consumer"

  constructor(
    @Inject(STREAM) redis: Redis,
    private readonly logger: LoggerService
  ) {
    super(redis)
  }

  async handleMessage(_: IQueuePayload) {
    try {
      await this.callExternalService()

      this.logger.log({
        message: "Consumer Service C processed a message",
        operation: "NotificationConsumerC.handleMessage"
      })
    } catch (error) {
      this.logger.log({
        message: error.message,
        stack: error.stack,
        operation: "NotificationConsumerC.handleMessage"
      })
    }
  }

  private async callExternalService() {
    return new Promise((resolve) => setTimeout(resolve, 1000))
  }
}
