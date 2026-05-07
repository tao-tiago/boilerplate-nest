import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common"
import { Observable } from "rxjs"

import { CustomRequest } from "@/core/shared/helpers/utility-types"

import { LoggerContext } from "../log/logger.context"

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private readonly loggerContext: LoggerContext) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const http = context.switchToHttp()
    const request = http.getRequest() as CustomRequest

    const correlationId = request.correlationId
    const method = request.method
    const path = request.baseUrl + request.path
    const service = "service-api"

    this.loggerContext.set({ correlationId, method, path, service })

    return next.handle()
  }
}
