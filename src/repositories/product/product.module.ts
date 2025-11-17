import { Module } from "@nestjs/common"

import { CacheModule } from "@/core/infra/cache/cache.module"
import { DbModule } from "@/core/infra/db/db.module"

import { ProductRepository } from "./product.repository"

@Module({
  imports: [DbModule, CacheModule],
  providers: [ProductRepository],
  exports: [ProductRepository]
})
export class ProductRepositoryModule {}
