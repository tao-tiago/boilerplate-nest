import { Module } from "@nestjs/common"
import { APP_FILTER, APP_GUARD } from "@nestjs/core"

import { AuthModule } from "./core/infra/auth/auth.module"
import { JwtAuthGuard } from "./core/infra/auth/guards/jwt-auth.guard"
import { RolesGuard } from "./core/infra/auth/guards/roles.guard"
import { LoggerFilter } from "./core/infra/log/logger.filter"
import { LoggerModule } from "./core/infra/log/logger.module"
import { LoggerService } from "./core/infra/log/logger.service"
import { ControllersRootModule } from "./http/controllersRoot.module"
import { WorkersRootModule } from "./workers/workersRoot.module"

@Module({
  imports: [AuthModule, LoggerModule, ControllersRootModule, WorkersRootModule],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    { provide: APP_FILTER, useClass: LoggerFilter },
    LoggerService
  ]
})
export class AppModule {}
