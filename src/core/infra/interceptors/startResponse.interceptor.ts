import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common"
import { Observable } from "rxjs"

import { loggerContext } from "../log/logger"

@Injectable()
export class StartResponseInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<unknown> {
    loggerContext.correlationId = crypto.randomUUID()
    loggerContext.service = "service-api"

    return next.handle()
  }
}
