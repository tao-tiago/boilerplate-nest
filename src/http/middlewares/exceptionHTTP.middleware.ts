import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { Request, Response } from "express"

import { Logger, logger } from "@/core/infra/log/logger"
import { LoggerService } from "@/core/infra/log/logger.service"
import { Warning } from "@/core/infra/warning"

@Injectable()
@Catch()
export class ExceptionHTTP implements ExceptionFilter {
  constructor(private readonly loggerService: LoggerService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const request = ctx.getRequest<Request>()
    const response = ctx.getResponse<Response>()

    const { method, params, path: uri } = request
    const path = `${uri}${params.path ? (Array.isArray(params.path) ? params.path.join("/") : `${params.path}`) : ""}`

    const loggerContext = {
      ...logger,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: ["Occured an unknown error. Please, try again later."],
      method,
      path
    } as Logger

    if (exception instanceof HttpException) {
      loggerContext.status = exception.getStatus()

      const httpResponse = exception.getResponse()

      if (typeof httpResponse === "string") {
        loggerContext.message = [httpResponse]
      }

      if (typeof httpResponse === "object" && "message" in httpResponse) {
        const respMessage = (httpResponse as { message: string }).message
        loggerContext.message = Array.isArray(respMessage) ? respMessage : [respMessage]
      }
    }

    if (exception instanceof Warning) {
      loggerContext.status = exception.status
      loggerContext.message = exception.message

      Object.assign(loggerContext, {
        ...loggerContext,
        ...exception.logger
      })
    }

    if (exception instanceof Error) {
      loggerContext.errorMessage = exception.message
      loggerContext.stack = exception.stack
    }

    if (loggerContext.status >= 500 && loggerContext.status <= 599) {
      this.loggerService.error(loggerContext)
    }

    response.status(loggerContext.status).json({
      message: loggerContext.message
    })
  }
}
