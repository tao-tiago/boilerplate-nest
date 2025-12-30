import { Module } from "@nestjs/common"

import { UserRepositoryModule } from "@/repositories/user/user.module"

import { CreateUserService } from "./createUser.service"

@Module({
  imports: [UserRepositoryModule],
  providers: [CreateUserService],
  exports: [CreateUserService]
})
export class CreateUserModule {}
