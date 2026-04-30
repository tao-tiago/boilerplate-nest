import { Injectable, NestMiddleware } from "@nestjs/common"
import { NextFunction, Response } from "express"

import { loggerContext } from "@/core/infra/log/logger"
import { LoggerService } from "@/core/infra/log/logger.service"
import { CustomRequest } from "@/core/shared/helpers/utility-types"
import { clearObject } from "@/core/shared/utils/clearObject"

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggerService) {}

  use(request: CustomRequest, response: Response, next: NextFunction) {
    const correlationId = request.correlationId
    const method = request.method
    const path = request.baseUrl + request.path

    Object.assign(loggerContext, { correlationId, method, path })

    this.logger.log(RequestLoggerMiddleware.name, loggerContext)

    response.on("close", () => {
      clearObject(loggerContext, ["service"])
    })

    next()
  }
}
