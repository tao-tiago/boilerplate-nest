import { Module } from "@nestjs/common"

import { ControllerRootModule } from "./http/controllers/controllersRoot.module"

@Module({
  imports: [ControllerRootModule]
})
export class AppModule {}
