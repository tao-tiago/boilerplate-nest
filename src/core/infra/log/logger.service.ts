import { Injectable, LoggerService as NestLoggerService } from "@nestjs/common"
import * as winston from "winston"

import { Logger, logger } from "./logger"

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
    this.winstonLogger.info("log", { ...logger, ...context })
  }

  error(context: Partial<Logger> = {}) {
    this.winstonLogger.error("error", { ...logger, ...context })
  }

  warn(context: Partial<Logger> = {}) {
    this.winstonLogger.warn("warn", { ...logger, ...context })
  }
}
