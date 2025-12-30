import { Module } from "@nestjs/common"

import { ProductServiceModule } from "@/services/product/product.module"

import { ProductController } from "./product.controller"

@Module({
  imports: [ProductServiceModule],
  controllers: [ProductController]
})
export class ProductControllerModule {}
