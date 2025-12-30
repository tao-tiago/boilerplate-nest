import { Inject, Injectable } from "@nestjs/common"
import Redis from "ioredis"

import { LoggerService } from "@/core/infra/log/logger.service"
import { BaseStreamConsumer } from "@/core/infra/stream/stream.consumer"
import { StreamProducer } from "@/core/infra/stream/stream.producer"
import { STREAM } from "@/core/infra/stream/stream.service"
import { IGroups, IQueue, IQueuePayload } from "@/core/infra/stream/stream.types"

@Injectable()
export class NotificationConsumerB extends BaseStreamConsumer {
  protected QUEUE = "NOTIFICATION_B" as IQueue
  protected GROUP = "notification-group-b" as IGroups
  protected CONSUMER = "consumer"

  constructor(
    @Inject(STREAM) redis: Redis,
    private readonly streamProducer: StreamProducer,
    private readonly logger: LoggerService
  ) {
    super(redis)
  }

  async handleMessage(payload: IQueuePayload) {
    try {
      await this.callExternalService()

      await this.streamProducer.publish({
        queue: "NOTIFICATION_C",
        payload
      })

      this.logger.log({
        message: "Consumer Service B processed a message",
        operation: "NotificationConsumerB.handleMessage"
      })
    } catch (error) {
      this.logger.log({
        message: error.message,
        stack: error.stack,
        operation: "NotificationConsumerB.handleMessage"
      })
    }
  }

  private async callExternalService() {
    return new Promise((resolve) => setTimeout(resolve, 2500))
  }
}
