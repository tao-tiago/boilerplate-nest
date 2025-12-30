import { Module } from "@nestjs/common"

import { UserRepositoryModule } from "@/repositories/user/user.module"

import { ListUserService } from "./listUser.service"

@Module({
  imports: [UserRepositoryModule],
  providers: [ListUserService],
  exports: [ListUserService]
})
export class ListUserModule {}
