import { Module } from "@nestjs/common"

import { ProductRepositoryModule } from "@/repositories/product/product.module"

import { ListProductService } from "./listProduct.service"

@Module({
  imports: [ProductRepositoryModule],
  providers: [ListProductService],
  exports: [ListProductService]
})
export class ListProductModule {}
