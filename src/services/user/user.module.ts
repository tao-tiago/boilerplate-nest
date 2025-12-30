import { Module } from "@nestjs/common"

import { CreateUserModule } from "./createUser/createUser.module"
import { ListUserModule } from "./listUser/listUser.module"

@Module({
  imports: [ListUserModule, CreateUserModule],
  exports: [ListUserModule, CreateUserModule]
})
export class UserServiceModule {}
