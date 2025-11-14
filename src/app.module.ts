import { Module } from "@nestjs/common"
import { APP_FILTER } from "@nestjs/core"

import { LoggerFilter } from "./core/infra/log/logger.filter"
import { LoggerModule } from "./core/infra/log/logger.module"
import { LoggerService } from "./core/infra/log/logger.service"
import { ControllerRootModule } from "./http/controllersRoot.module"

@Module({
  providers: [
    LoggerService,
    {
      provide: APP_FILTER,
      useClass: LoggerFilter
    }
  ],
  imports: [LoggerModule, ControllerRootModule]
})
export class AppModule {}
