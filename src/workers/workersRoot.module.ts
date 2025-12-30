import { Module } from "@nestjs/common"

import { NotificationStreamConsumerModule } from "./notification/notificationStreamConsumer.module"

@Module({
  imports: [NotificationStreamConsumerModule]
})
export class WorkersRootModule {}
