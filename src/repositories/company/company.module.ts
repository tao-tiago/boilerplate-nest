import { Module } from "@nestjs/common"

import { CacheModule } from "@/core/infra/cache/cache.module"
import { DbModule } from "@/core/infra/db/db.module"

import { CompanyRepository } from "./company.repository"

@Module({
  imports: [DbModule, CacheModule],
  providers: [CompanyRepository],
  exports: [CompanyRepository]
})
export class CompanyRepositoryModule {}
