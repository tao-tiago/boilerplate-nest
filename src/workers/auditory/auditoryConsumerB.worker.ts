import { Injectable, Logger } from "@nestjs/common"
import Redis from "ioredis"

import { BaseStreamConsumer } from "@/core/infra/stream/stream.consumer"
import { StreamProducer } from "@/core/infra/stream/stream.producer"
import { IQueue, IQueuePayload } from "@/core/infra/stream/stream.types"

@Injectable()
export class AuditoryConsumerB extends BaseStreamConsumer {
  protected QUEUE = "AUDITORY_PROCESSING" as IQueue
  protected GROUP = "group-b"
  protected CONSUMER = "consumer"

  private readonly logger = new Logger(AuditoryConsumerB.name)

  constructor(
    public readonly stream: Redis,
    private readonly streamProducer: StreamProducer
  ) {
    super(stream)
  }

  async handleMessage(payload: IQueuePayload<unknown>) {
    try {
      await this.callExternalService()

      await this.streamProducer.addProcess(payload.correlationId, "B")

      await this.streamProducer.publish({
        queue: "AUDITORY_AGGREGATION",
        payload
      })

      this.logger.log("Consumer Service B processed a message", {
        operation: "AuditoryConsumerB.handleMessage"
      })
    } catch (error) {
      this.logger.error(error.message, {
        stack: error.stack,
        operation: "AuditoryConsumerB.handleMessage"
      })

      throw error
    }
  }

  private async callExternalService() {
    return new Promise((resolve) => setTimeout(resolve, 5000))
  }
}
