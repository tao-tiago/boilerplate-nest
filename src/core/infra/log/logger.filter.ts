import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Injectable
} from "@nestjs/common"
import { Response } from "express"

import { LoggerService } from "./logger.service"
import { ILogger } from "./logger.type"

@Injectable()
@Catch()
export class LoggerFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    const internalLogger = {
      status: HttpStatus.INTERNAL_SERVER_ERROR
    } as ILogger

    let messageHumanReadable = ["An unknown error occurred. Please, try again later."]
    let messageInternalError = "Internal Server Error"

    if (exception instanceof HttpException) {
      internalLogger.status = exception.getStatus()

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
      internalLogger.stack = exception.stack
    }

    if (internalLogger.status >= 500 && internalLogger.status <= 599) {
      this.logger.error(messageInternalError, internalLogger)
    }

    response.status(internalLogger.status).json({
      message: messageHumanReadable
    })
  }
}
