import { Module } from "@nestjs/common"

import { UserRepositoryModule } from "@/repositories/user/user.module"

import { CreateUserService } from "./createUser/createUser.service"
import { ListUserService } from "./listUser/listUser.service"

@Module({
  imports: [UserRepositoryModule],
  providers: [ListUserService, CreateUserService],
  exports: [ListUserService, CreateUserService]
})
export class UserServiceModule {}
