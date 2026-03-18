import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common"
import { ClsService } from "nestjs-cls"
import { randomUUID } from "node:crypto"
import { Observable } from "rxjs"
import { tap } from "rxjs/operators"

import { loggerContext } from "../log/logger"

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private readonly cls: ClsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const http = context.switchToHttp()
    const request = http.getRequest()
    const response = http.getResponse()

    const correlationId = request.headers["x-correlation-id"] ?? randomUUID()

    request.correlationId = correlationId

    Object.assign(loggerContext, {
      correlationId
    })

    this.cls.set("correlationId", correlationId)

    response.setHeader("x-correlation-id", correlationId)

    return next.handle().pipe(tap(() => {}))
  }
}
