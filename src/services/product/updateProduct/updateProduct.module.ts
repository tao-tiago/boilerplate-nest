import { Module } from "@nestjs/common"

import { ProductRepositoryModule } from "@/repositories/product/product.module"

import { UpdateProductService } from "./updateProduct.service"

@Module({
  imports: [ProductRepositoryModule],
  providers: [UpdateProductService],
  exports: [UpdateProductService]
})
export class UpdateProductModule {}
