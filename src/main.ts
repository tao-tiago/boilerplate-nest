import { Logger, ValidationPipe } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import helmet from "helmet"

import { GLOBAL_PREFIX, PORT } from "./core/constants"
import { swaggerInit } from "./core/infra/libraries/swagger"
import { LoggerService } from "./core/infra/log/logger.service"
import { AppModule } from "./app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true
  })

  app.setGlobalPrefix(GLOBAL_PREFIX)
  app.enableCors()
  app.use(helmet())
  app.useLogger(new LoggerService())
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true
    })
  )

  swaggerInit(app)

  await app.listen(PORT)
  Logger.log(`Application is running on: http://localhost:${PORT}`)
}

void bootstrap()
