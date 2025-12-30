import { Module } from "@nestjs/common"

import { StreamModule } from "@/core/infra/stream/stream.module"
import { CompanyRepositoryModule } from "@/repositories/company/company.module"
import { ProductRepositoryModule } from "@/repositories/product/product.module"

import { CreateProductService } from "./createProduct.service"

@Module({
  imports: [ProductRepositoryModule, CompanyRepositoryModule, StreamModule],
  providers: [CreateProductService],
  exports: [CreateProductService]
})
export class CreateProductModule {}
