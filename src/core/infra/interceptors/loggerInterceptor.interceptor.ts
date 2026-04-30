import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common"
import { ClsService } from "nestjs-cls"
import { Observable } from "rxjs"
import { tap } from "rxjs/operators"

import { CustomRequest } from "@/core/shared/helpers/utility-types"

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private readonly cls: ClsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const http = context.switchToHttp()
    const request = http.getRequest() as CustomRequest

    this.cls.set("correlationId", request.correlationId)

    return next.handle().pipe(tap(() => {}))
  }
}
