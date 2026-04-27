import { INestApplication } from "@nestjs/common"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"

import { GLOBAL_PREFIX } from "@/core/constants"

export const swaggerInit = (app: INestApplication<unknown>) => {
  const config = new DocumentBuilder()
    .setTitle("Boilerplate API")
    .setDescription("Boilerplate API documentation")
    .setVersion("0.1")
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup(GLOBAL_PREFIX + "/swagger-ui", app, document, {
    swaggerOptions: {
      tagsSorter: "alpha",
      operationsSorter: "alpha"
    }
  })
}
