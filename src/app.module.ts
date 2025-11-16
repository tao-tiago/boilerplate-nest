import { Module } from "@nestjs/common"
import { APP_FILTER } from "@nestjs/core"

import { AuthModule } from "./core/infra/auth/auth.module"
import { LoggerFilter } from "./core/infra/log/logger.filter"
import { LoggerModule } from "./core/infra/log/logger.module"
import { LoggerService } from "./core/infra/log/logger.service"
import { ControllerRootModule } from "./http/controllersRoot.module"

@Module({
  imports: [AuthModule, LoggerModule, ControllerRootModule],
  providers: [
    LoggerService,
    {
      provide: APP_FILTER,
      useClass: LoggerFilter
    }
  ]
})
export class AppModule {}
