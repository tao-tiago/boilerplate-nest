import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { Response } from "express"

import { LoggerService } from "@/core/infra/log/logger.service"
import { Warning } from "@/core/infra/warning"

@Injectable()
@Catch()
export class ExceptionHTTP implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    let status = HttpStatus.INTERNAL_SERVER_ERROR
    let message: string[] = ["Occured an unknown error. Please, try again later."]
    let errorMessage: unknown = undefined
    let stack: unknown = undefined

    if (exception instanceof HttpException) {
      status = exception.getStatus()

      const httpResponse = exception.getResponse()

      if (typeof httpResponse === "string") {
        message = [httpResponse]
      }

      if (typeof httpResponse === "object" && "message" in httpResponse) {
        const respMessage = (httpResponse as { message: string }).message
        message = Array.isArray(respMessage) ? respMessage : [respMessage]
      }
    }

    if (exception instanceof Warning) {
      status = exception.status
      message = exception.message
    }

    if (exception instanceof Error) {
      errorMessage = exception.message
      stack = exception.stack
    }

    if (status >= 500 && status <= 599) {
      this.logger.error({
        status,
        message,
        errorMessage,
        stack
      })
    }

    response.status(status).json({
      message
    })
  }
}
