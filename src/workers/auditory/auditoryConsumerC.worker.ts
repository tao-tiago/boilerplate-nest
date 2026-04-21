import { Injectable, Logger } from "@nestjs/common"
import Redis from "ioredis"

import { BaseStreamConsumer } from "@/core/infra/stream/stream.consumer"
import { StreamProducer } from "@/core/infra/stream/stream.producer"
import { IQueue, IQueuePayload } from "@/core/infra/stream/stream.types"

@Injectable()
export class AuditoryConsumerC extends BaseStreamConsumer {
  protected QUEUE = "AUDITORY_PROCESSING" as IQueue
  protected GROUP = "group-c"
  protected CONSUMER = "consumer"

  private readonly logger = new Logger(AuditoryConsumerC.name)

  constructor(
    public readonly stream: Redis,
    private readonly streamProducer: StreamProducer
  ) {
    super(stream)
  }

  async handleMessage(payload: IQueuePayload<unknown>) {
    try {
      await this.callExternalService()

      await this.streamProducer.addProcess(payload.correlationId, "C")

      await this.streamProducer.publish({
        queue: "AUDITORY_AGGREGATION",
        payload
      })

      this.logger.log("Consumer Service C processed a message", {
        operation: "AuditoryConsumerC.handleMessage"
      })
    } catch (error) {
      this.logger.error(error.message, {
        stack: error.stack,
        operation: "AuditoryConsumerC.handleMessage"
      })

      throw error
    }
  }

  private async callExternalService() {
    return new Promise((resolve) => setTimeout(resolve, 1000))
  }
}
