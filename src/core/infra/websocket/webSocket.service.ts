import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets"
import { Server } from "socket.io"

import { IWebSocket } from "./webSocket.types"

@WebSocketGateway({ cors: true })
export class WebSocketService {
  @WebSocketServer()
  server: Server

  emit({ webSocketKey, payload }: IWebSocket) {
    this.server.emit(webSocketKey, payload)
  }
}
