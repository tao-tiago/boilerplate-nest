import { Module } from "@nestjs/common"
import { APP_FILTER } from "@nestjs/core"

import { LoggerService } from "./core/infra/log/logger.service"
import { ControllerRootModule } from "./http/controllersRoot.module"
import { ExceptionHTTP } from "./http/middlewares/exceptionHTTP.middleware"

@Module({
  providers: [
    LoggerService,
    {
      provide: APP_FILTER,
      useClass: ExceptionHTTP
    }
  ],
  imports: [ControllerRootModule]
})
export class AppModule {}
