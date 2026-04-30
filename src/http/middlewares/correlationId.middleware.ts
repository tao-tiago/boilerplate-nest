import { Injectable, NestMiddleware } from "@nestjs/common"
import { NextFunction, Response } from "express"
import { randomUUID } from "node:crypto"

import { CustomRequest } from "@/core/shared/helpers/utility-types"

@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
  use(request: CustomRequest, response: Response, next: NextFunction) {
    const correlationId = (request.headers["x-correlation-id"] ?? randomUUID()) as string

    request.correlationId = correlationId
    response.setHeader("x-correlation-id", correlationId)

    next()
  }
}
