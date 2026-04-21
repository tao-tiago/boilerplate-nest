import { Injectable, LoggerService as NestLoggerService } from "@nestjs/common"
import * as winston from "winston"

import { clearObject } from "@/core/shared/utils/clearObject"

import { Logger, loggerContext } from "./logger"

@Injectable()
export class LoggerService implements NestLoggerService {
  private winstonLogger: winston.Logger

  constructor() {
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

  log(message: string, context: Partial<Logger> | string = {}) {
    this.normalizeContext(context)

    this.winstonLogger.info(message, { ...loggerContext })

    clearObject(loggerContext, ["service"])
  }

  error(message: string, context: Partial<Logger> | string = {}) {
    this.normalizeContext(context)

    this.winstonLogger.error(message, { ...loggerContext })

    clearObject(loggerContext, ["service"])
  }

  warn(message: string, context: Partial<Logger> | string = {}) {
    this.normalizeContext(context)

    this.winstonLogger.warn(message, { ...loggerContext })

    clearObject(loggerContext, ["service"])
  }

  private normalizeContext(context: Partial<Logger> | string) {
    if (typeof context === "string") {
      context = { operation: context }
    }

    Object.assign(loggerContext, {
      ...loggerContext,
      ...context
    })
  }
}
