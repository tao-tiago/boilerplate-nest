import { Inject, Injectable } from "@nestjs/common"
import Redis from "ioredis"

import { LoggerService } from "@/core/infra/log/logger.service"
import { BaseStreamConsumer } from "@/core/infra/stream/stream.consumer"
import { StreamProducer } from "@/core/infra/stream/stream.producer"
import { STREAM } from "@/core/infra/stream/stream.service"
import { IGroups, IQueue, IQueuePayload } from "@/core/infra/stream/stream.types"

@Injectable()
export class AuditoryConsumerMain extends BaseStreamConsumer {
  protected QUEUE = "AUDITORY_MAIN" as IQueue
  protected GROUP = "group-auditory-main" as IGroups
  protected CONSUMER = "consumer"

  constructor(
    @Inject(STREAM) stream: Redis,
    private readonly streamProducer: StreamProducer,
    private readonly logger: LoggerService
  ) {
    super(stream)
  }

  async handleMessage(data: IQueuePayload) {
    try {
      await this.callExternalService()

      await this.streamProducer.publish({
        queue: "AUDITORY_PROCESSING",
        payload: data
      })

      this.logger.log({
        message: "Consumer Main processed a message",
        operation: "AuditoryConsumerMain.handleMessage"
      })
    } catch (error) {
      this.logger.log({
        message: error.message,
        stack: error.stack,
        operation: "AuditoryConsumerMain.handleMessage"
      })

      throw error
    }
  }

  private async callExternalService() {
    return new Promise((resolve) => setTimeout(resolve, 5000))
  }
}
