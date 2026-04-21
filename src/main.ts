import { Logger, ValidationPipe } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import helmet from "helmet"

import { LoggerService } from "./core/infra/log/logger.service"
import { AppModule } from "./app.module"

async function bootstrap() {
  const port = process.env.PORT ?? 3333
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true
  })

  app.useLogger(new LoggerService())

  app.enableCors()
  app.use(helmet())
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true
    })
  )

  await app.listen(port)
  Logger.log(`Application is running on: http://localhost:${port}`)
}

void bootstrap()
