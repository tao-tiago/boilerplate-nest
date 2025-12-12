import { Injectable, LoggerService as NestLoggerService } from "@nestjs/common"
import * as winston from "winston"

import { Logger, loggerContext } from "./logger"

@Injectable()
export class LoggerService implements NestLoggerService {
  private winstonLogger: winston.Logger

  constructor() {
    this.winstonLogger = winston.createLogger({
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-mm-DDTHH:mm:ssZ" }),
        winston.format.json()
      ),
      transports: [new winston.transports.Console()]
    })
  }

  log(context: Partial<Logger> & { message: string }) {
    const { message, ...localContext } = context

    Object.assign(loggerContext, {
      ...loggerContext,
      ...localContext
    })

    this.winstonLogger.info(message, { ...loggerContext })
  }

  error(context: Partial<Logger> & { message: string }) {
    const { message, ...localContext } = context

    Object.assign(loggerContext, {
      ...loggerContext,
      ...localContext
    })

    this.winstonLogger.error(message, { ...loggerContext })
  }

  warn(context: Partial<Logger> & { message: string }) {
    const { message, ...localContext } = context

    Object.assign(loggerContext, {
      ...loggerContext,
      ...localContext
    })

    this.winstonLogger.warn(message, { ...loggerContext })
  }
}
