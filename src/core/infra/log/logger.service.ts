import { Injectable, LoggerService as NestLoggerService } from "@nestjs/common"
import * as winston from "winston"

import { LoggerContext } from "./logger"
import { ILogger } from "./logger.type"

@Injectable()
export class LoggerService implements NestLoggerService {
  private winstonLogger: winston.Logger

  constructor(private readonly loggerContext: LoggerContext) {
    this.winstonLogger = winston.addColors({
      info: "green",
      warn: "yellow",
      error: "red"
    })

    this.winstonLogger = winston.createLogger({
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.errors({ stack: true }),
        winston.format.json(),
        winston.format.colorize({ all: true })
      ),
      transports: [new winston.transports.Console()]
    })
  }

  log(message: string, context: Partial<ILogger> | string = {}) {
    const normalizedContext = this.normalizeContext(context, this.loggerContext.get())

    this.winstonLogger.info(message, normalizedContext)
  }

  error(message: string, context: Partial<ILogger> | string = {}) {
    const normalizedContext = this.normalizeContext(context, this.loggerContext.get())

    this.winstonLogger.error(message, normalizedContext)
  }

  warn(message: string, context: Partial<ILogger> | string = {}) {
    const normalizedContext = this.normalizeContext(context, this.loggerContext.get())

    this.winstonLogger.warn(message, normalizedContext)
  }

  private normalizeContext(
    context: Partial<ILogger> | string,
    internalContext: Partial<ILogger>
  ): Partial<ILogger> {
    if (typeof context === "string") {
      context = { operation: context }
    }

    return {
      ...internalContext,
      ...context
    }
  }
}
