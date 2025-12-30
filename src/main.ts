import { Logger, ValidationPipe } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import helmet from "helmet"

import { FinishResponseInterceptor } from "./core/infra/interceptors/finishResponse.interceptor"
import { StartResponseInterceptor } from "./core/infra/interceptors/startResponse.interceptor"
import { AppModule } from "./app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors()
  app.use(helmet())
  app.useGlobalInterceptors(new StartResponseInterceptor())
  app.useGlobalInterceptors(new FinishResponseInterceptor())
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true
    })
  )

  await app.listen(process.env.PORT ?? 3333)
  Logger.log(`Application is running on: localhost:${process.env.PORT ?? 3333}`)
}

void bootstrap()
