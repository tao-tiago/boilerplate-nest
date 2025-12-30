import { Module } from "@nestjs/common"

import { AuditoryConsumerModule } from "./auditory/auditoryConsumer.module"
// import { NotificationConsumerModule } from "./notification/notificationConsumer.module"

@Module({
  imports: [
    AuditoryConsumerModule
    // NotificationConsumerModule
  ]
})
export class WorkersRootModule {}
