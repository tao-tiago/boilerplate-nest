import { Injectable } from "@nestjs/common"
import { ClsService } from "nestjs-cls"

import { ILogger, ILoggerRequired } from "./logger.type"

@Injectable()
export class LoggerContext {
  constructor(private readonly cls: ClsService) {}

  set(context: ILoggerRequired & Partial<ILogger>) {
    const internalContext = this.cls.get("loggerContext") ?? {}
    this.cls.set("loggerContext", { ...internalContext, ...context })
  }

  get(): ILoggerRequired & Partial<ILogger> {
    return this.cls.get("loggerContext") ?? {}
  }
}
