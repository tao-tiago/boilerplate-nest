import { Global, Module } from "@nestjs/common"

import { LoggerContext } from "./logger"
import { LoggerService } from "./logger.service"

@Global()
@Module({
  providers: [LoggerService, LoggerContext],
  exports: [LoggerService, LoggerContext]
})
export class LoggerModule {}
