import { Module } from "@nestjs/common"

import { CacheModule } from "@/core/infra/cache/cache.module"
import { DbModule } from "@/core/infra/db/db.module"

import { UserRepository } from "./user.repository"

@Module({
  imports: [DbModule, CacheModule],
  providers: [UserRepository],
  exports: [UserRepository]
})
export class UserRepositoryModule {}
