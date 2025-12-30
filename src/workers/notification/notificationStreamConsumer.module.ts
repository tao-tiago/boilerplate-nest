import { Module } from "@nestjs/common"

import { StreamModule } from "@/core/infra/stream/stream.module"
import { WebSocketModule } from "@/core/infra/websocket/webSocket.module"

import { NotificationStreamConsumer } from "./notificationStreamConsumer.worker"

@Module({
  imports: [StreamModule, WebSocketModule],
  providers: [NotificationStreamConsumer]
})
export class NotificationStreamConsumerModule {}
