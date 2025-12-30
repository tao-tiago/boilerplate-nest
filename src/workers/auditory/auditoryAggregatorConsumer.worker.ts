import { Inject, Injectable } from "@nestjs/common"
import Redis from "ioredis"

import { LoggerService } from "@/core/infra/log/logger.service"
import { BaseStreamConsumer } from "@/core/infra/stream/stream.consumer"
import { StreamProducer } from "@/core/infra/stream/stream.producer"
import { STREAM } from "@/core/infra/stream/stream.service"
import { IGroups, IQueue, IQueuePayload } from "@/core/infra/stream/stream.types"

@Injectable()
export class AuditoryAggregatorConsumer extends BaseStreamConsumer {
  protected QUEUE = "AUDITORY_AGGREGATION" as IQueue
  protected GROUP = "group-auditory-aggregator" as IGroups
  protected CONSUMER = "consumer"

  private readonly REQUIRED = ["A", "B", "C"]

  constructor(
    @Inject(STREAM) stream: Redis,
    private readonly streamProducer: StreamProducer,
    private readonly logger: LoggerService
  ) {
    super(stream)
  }

  async handleMessage(data: IQueuePayload) {
    try {
      const completedServices = await this.streamProducer.getProcess(data.correlationId)
      const aggregatorDone = completedServices.includes("aggregator")

      if (this.REQUIRED.every((service) => completedServices.includes(service)) && !aggregatorDone) {
        await this.callExternalService()

        await this.streamProducer.addProcess(data.correlationId, "aggregator")

        this.logger.log({
          message: "Consumer Aggregator processed a message",
          operation: "AuditoryAggregatorConsumer.handleMessage"
        })
      }
    } catch (error) {
      this.logger.log({
        message: error.message,
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
