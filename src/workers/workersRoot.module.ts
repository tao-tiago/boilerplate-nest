import { Module } from "@nestjs/common"

import { NotificationConsumerModule } from "./notification/notificationConsumer.module"

@Module({
  imports: [NotificationConsumerModule]
})
export class WorkersRootModule {}
