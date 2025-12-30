import { Module } from "@nestjs/common"

import { ProductRepositoryModule } from "@/repositories/product/product.module"

import { ShowProductService } from "./showProduct.service"

@Module({
  imports: [ProductRepositoryModule],
  providers: [ShowProductService],
  exports: [ShowProductService]
})
export class ShowProductModule {}
