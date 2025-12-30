import { Module } from "@nestjs/common"

import { WebSocketService } from "./webSocket.service"

@Module({
  providers: [WebSocketService],
  exports: [WebSocketService]
})
export class WebSocketModule {}
