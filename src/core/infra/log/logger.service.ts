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

  log(context: Partial<Logger> = {}) {
    Object.assign(loggerContext, {
      ...loggerContext,
      ...context
    })
    this.winstonLogger.info("log", { ...loggerContext })
  }

  error(context: Partial<Logger> = {}) {
    Object.assign(loggerContext, {
      ...loggerContext,
      ...context
    })
    this.winstonLogger.error("error", { ...loggerContext })
  }

  warn(context: Partial<Logger> = {}) {
    Object.assign(loggerContext, {
      ...loggerContext,
      ...context
    })
    this.winstonLogger.warn("warn", { ...loggerContext })
  }
}
