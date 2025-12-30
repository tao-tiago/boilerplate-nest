import { Inject, Injectable } from "@nestjs/common"
import Redis from "ioredis"

import { LoggerService } from "@/core/infra/log/logger.service"
import { BaseStreamConsumer } from "@/core/infra/stream/stream.consumer"
import { StreamProducer } from "@/core/infra/stream/stream.producer"
import { STREAM } from "@/core/infra/stream/stream.service"
import { IGroups, IQueue, IQueuePayload } from "@/core/infra/stream/stream.types"

@Injectable()
export class AuditoryConsumerA extends BaseStreamConsumer {
  protected QUEUE = "AUDITORY_PROCESSING" as IQueue
  protected GROUP = "group-a" as IGroups
  protected CONSUMER = "consumer"

  constructor(
    @Inject(STREAM) stream: Redis,
    private readonly streamProducer: StreamProducer,
    private readonly logger: LoggerService
  ) {
    super(stream)
  }

  async handleMessage(payload: IQueuePayload) {
    try {
      await this.callExternalService()

      await this.streamProducer.addProcess(payload.correlationId, "A")

      await this.streamProducer.publish({
        queue: "AUDITORY_AGGREGATION",
        payload
      })

      this.logger.log({
        message: "Consumer Service A processed a message",
        operation: "AuditoryConsumerA.handleMessage"
      })
    } catch (error) {
      this.logger.log({
        message: error.message,
        stack: error.stack,
        operation: "AuditoryConsumerA.handleMessage"
      })

      throw error
    }
  }

  private async callExternalService() {
    return new Promise((resolve) => setTimeout(resolve, 3500))
  }
}
