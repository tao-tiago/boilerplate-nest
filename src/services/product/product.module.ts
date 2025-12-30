import { Module } from "@nestjs/common"

import { CreateProductModule } from "./createProduct/createProduct.module"
import { DeleteProductModule } from "./deleteProduct/deleteProduct.module"
import { ListProductModule } from "./listProduct/listProduct.module"
import { ShowProductModule } from "./showProduct/showProduct.module"
import { UpdateProductModule } from "./updateProduct/updateProduct.module"

@Module({
  imports: [
    ListProductModule,
    CreateProductModule,
    ShowProductModule,
    UpdateProductModule,
    DeleteProductModule
  ],
  exports: [
    ListProductModule,
    CreateProductModule,
    ShowProductModule,
    UpdateProductModule,
    DeleteProductModule
  ]
})
export class ProductServiceModule {}
