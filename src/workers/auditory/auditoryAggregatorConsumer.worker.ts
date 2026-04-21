import { Injectable, Logger } from "@nestjs/common"
import Redis from "ioredis"

import { BaseStreamConsumer } from "@/core/infra/stream/stream.consumer"
import { StreamProducer } from "@/core/infra/stream/stream.producer"
import { IQueue, IQueuePayload } from "@/core/infra/stream/stream.types"

@Injectable()
export class AuditoryAggregatorConsumer extends BaseStreamConsumer {
  protected QUEUE = "AUDITORY_AGGREGATION" as IQueue
  protected GROUP = "group-auditory-aggregator"
  protected CONSUMER = "consumer"

  private readonly logger = new Logger(AuditoryAggregatorConsumer.name)
  private readonly REQUIRED = ["A", "B", "C"]

  constructor(
    public readonly stream: Redis,
    private readonly streamProducer: StreamProducer
  ) {
    super(stream)
  }

  async handleMessage(data: IQueuePayload<unknown>) {
    try {
      const completedServices = await this.streamProducer.getProcess(data.correlationId)
      const aggregatorDone = completedServices.includes("aggregator")

      if (this.REQUIRED.every((service) => completedServices.includes(service)) && !aggregatorDone) {
        await this.callExternalService()

        await this.streamProducer.addProcess(data.correlationId, "aggregator")

        this.logger.log("Consumer Aggregator processed a message", {
          operation: "AuditoryAggregatorConsumer.handleMessage"
        })
      }
    } catch (error) {
      this.logger.error(error.message, {
        stack: error.stack,
        operation: "AuditoryAggregatorConsumer.handleMessage"
      })

      throw error
    }
  }

  private async callExternalService() {
    return new Promise((resolve) => setTimeout(resolve, 2000))
  }
}
