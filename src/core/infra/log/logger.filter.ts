import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Injectable
} from "@nestjs/common"
import { Request, Response } from "express"

import { ILogger, loggerContext } from "./logger"
import { LoggerService } from "./logger.service"

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
    } as ILogger

    let messageHumanReadable = ["An unknown error occurred. Please, try again later."]
    let messageInternalError = "Internal Server Error"

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

    if (exception instanceof Error) {
      messageInternalError = exception.message
      loggerParser.stack = exception.stack
    }

    if (loggerParser.status >= 500 && loggerParser.status <= 599) {
      this.logger.error(messageInternalError, loggerParser)
    }

    response.status(loggerParser.status).json({
      message: messageHumanReadable
    })
  }
}
