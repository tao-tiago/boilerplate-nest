import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core"
import { ClsModule } from "nestjs-cls"

import { AuthModule } from "./core/infra/auth/auth.module"
import { JwtAuthGuard } from "./core/infra/auth/guards/jwt-auth.guard"
import { RolesGuard } from "./core/infra/auth/guards/roles.guard"
import { LoggerInterceptor } from "./core/infra/interceptors/loggerInterceptor.interceptor"
import { LoggerFilter } from "./core/infra/log/logger.filter"
import { LoggerModule } from "./core/infra/log/logger.module"
import { ControllersRootModule } from "./http/controllersRoot.module"
import { CorrelationIdMiddleware } from "./http/middlewares/correlationId.middleware"
import { RequestLoggerMiddleware } from "./http/middlewares/requestLogger.middleware"
import { WorkersRootModule } from "./workers/workersRoot.module"

@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true
      }
    }),
    AuthModule,
    LoggerModule,
    ControllersRootModule,
    WorkersRootModule
  ],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: LoggerInterceptor },
    { provide: APP_FILTER, useClass: LoggerFilter },
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard }
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware).forRoutes("*path")
    consumer.apply(RequestLoggerMiddleware).forRoutes("*path")
  }
}
