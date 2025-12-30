import { Module } from "@nestjs/common"

import { ProductRepositoryModule } from "@/repositories/product/product.module"

import { DeleteProductService } from "./deleteProduct.service"

@Module({
  imports: [ProductRepositoryModule],
  providers: [DeleteProductService],
  exports: [DeleteProductService]
})
export class DeleteProductModule {}
