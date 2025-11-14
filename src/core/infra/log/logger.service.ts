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
    this.winstonLogger.info("log", { ...context, ...loggerContext })
  }

  error(context: Partial<Logger> = {}) {
    this.winstonLogger.error({ ...context, ...loggerContext })
  }

  warn(context: Partial<Logger> = {}) {
    this.winstonLogger.warn("warn", { ...context, ...loggerContext })
  }
}
