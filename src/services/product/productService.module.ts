import { Module } from "@nestjs/common"
import { ProductRepositoryModule } from "src/repositories/product/productRepository.module"

import { CompanyRepositoryModule } from "@/repositories/company/companyRepository.module"

import { CreateProductService } from "./createProduct/createProduct.service"
import { DeleteProductService } from "./deleteProduct/deleteProduct.service"
import { ListProductService } from "./listProduct/listProduct.service"
import { ShowProductService } from "./showProduct/showProduct.service"
import { UpdateProductService } from "./updateProduct/updateProduct.service"

@Module({
  imports: [CompanyRepositoryModule, ProductRepositoryModule],
  providers: [
    ListProductService,
    CreateProductService,
    ShowProductService,
    UpdateProductService,
    DeleteProductService
  ],
  exports: [
    ListProductService,
    CreateProductService,
    ShowProductService,
    UpdateProductService,
    DeleteProductService
  ]
})
export class ProductServiceModule {}
