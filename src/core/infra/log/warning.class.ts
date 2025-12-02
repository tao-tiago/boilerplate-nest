import { Logger, loggerContext } from "./logger"

export class Warning {
  public readonly message: string[]
  public readonly status: number
  public readonly logger: Partial<Logger>

  constructor(message: string | string[], status = 500, loggerInternal: Partial<Logger> = {}) {
    this.status = status
    this.logger = { ...loggerContext, ...loggerInternal }

    if (typeof message === "string") {
      this.message = [message]
    }

    if (Array.isArray(message)) {
      this.message = message
    }
  }
}
