import { Module } from "@nestjs/common"

import { StreamModule } from "@/core/infra/stream/stream.module"
import { WebSocketModule } from "@/core/infra/websocket/webSocket.module"

import { NotificationConsumerA } from "./notificationConsumerA.worker"
import { NotificationConsumerB } from "./notificationConsumerB.worker"
import { NotificationConsumerC } from "./notificationConsumerC.worker"

@Module({
  imports: [StreamModule, WebSocketModule],
  providers: [NotificationConsumerA, NotificationConsumerB, NotificationConsumerC]
})
export class NotificationConsumerModule {}
