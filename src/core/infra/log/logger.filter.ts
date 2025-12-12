import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { Request, Response } from "express"

import { Logger, loggerContext } from "@/core/infra/log/logger"
import { LoggerService } from "@/core/infra/log/logger.service"

import { Warning } from "./warning.class"

@Injectable()
@Catch()
export class LoggerFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const request = ctx.getRequest<Request>()
    const response = ctx.getResponse<Response>()

    const { method, params, path: uri } = request
    const path = `${uri}${params.path ? (Array.isArray(params.path) ? params.path.join("/") : `${params.path}`) : ""}`

    const loggerParser = {
      ...loggerContext,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      method,
      path
    } as Logger

    let messageHumanReadable = ["Occured an unknown error. Please, try again later."]

    if (exception instanceof HttpException) {
      loggerParser.status = exception.getStatus()

      const httpResponse = exception.getResponse()

      if (typeof httpResponse === "string") {
        messageHumanReadable = [httpResponse]
      }

      if (typeof httpResponse === "object" && "message" in httpResponse) {
        const respMessage = (httpResponse as { message: string }).message
        messageHumanReadable = Array.isArray(respMessage) ? respMessage : [respMessage]
      }
    }

    if (exception instanceof Warning) {
      loggerParser.status = exception.status
      messageHumanReadable = exception.message

      Object.assign(loggerParser, {
        ...loggerParser,
        ...exception.logger
      })
    }

    if (exception instanceof Error) {
      loggerParser.message = exception.message
      loggerParser.stack = exception.stack
    }

    if (loggerParser.status >= 500 && loggerParser.status <= 599) {
      this.logger.error(loggerParser)
    }

    response.status(loggerParser.status).json({
      message: messageHumanReadable
    })
  }
}
