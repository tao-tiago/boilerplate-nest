import { Module } from "@nestjs/common"

import { StreamModule } from "@/core/infra/stream/stream.module"

import { AuditoryAggregatorConsumer } from "./auditoryAggregatorConsumer.worker"
import { AuditoryConsumerA } from "./auditoryConsumerA.worker"
import { AuditoryConsumerB } from "./auditoryConsumerB.worker"
import { AuditoryConsumerC } from "./auditoryConsumerC.worker"
import { AuditoryConsumerMain } from "./auditoryConsumerMain.worker"

@Module({
  imports: [StreamModule],
  providers: [
    AuditoryConsumerMain,
    AuditoryConsumerA,
    AuditoryConsumerB,
    AuditoryConsumerC,
    AuditoryAggregatorConsumer
  ]
})
export class AuditoryConsumerModule {}
