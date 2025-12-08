import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common"
import { Observable } from "rxjs"

import { loggerContext } from "../log/logger"

@Injectable()
export class FinishResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const response = context.switchToHttp().getResponse()

    response.on("finish", () => {
      Object.keys(loggerContext).forEach((key) => {
        delete loggerContext[key]
      })
    })

    return next.handle()
  }
}
