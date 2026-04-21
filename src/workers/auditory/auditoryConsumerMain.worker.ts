import { Injectable, Logger } from "@nestjs/common"
import Redis from "ioredis"

import { BaseStreamConsumer } from "@/core/infra/stream/stream.consumer"
import { StreamProducer } from "@/core/infra/stream/stream.producer"
import { IQueue, IQueuePayload } from "@/core/infra/stream/stream.types"

@Injectable()
export class AuditoryConsumerMain extends BaseStreamConsumer {
  protected QUEUE = "AUDITORY_MAIN" as IQueue
  protected GROUP = "group-auditory-main"
  protected CONSUMER = "consumer"

  private readonly logger = new Logger(AuditoryConsumerMain.name)

  constructor(
    public readonly stream: Redis,
    private readonly streamProducer: StreamProducer
  ) {
    super(stream)
  }

  async handleMessage(data: IQueuePayload<unknown>) {
    try {
      await this.callExternalService()

      await this.streamProducer.publish({
        queue: "AUDITORY_PROCESSING",
        payload: data
      })

      this.logger.log("Consumer Main processed a message", {
        operation: "AuditoryConsumerMain.handleMessage"
      })
    } catch (error) {
      this.logger.error(error.message, {
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
