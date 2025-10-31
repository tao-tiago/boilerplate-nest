import { Module } from "@nestjs/common"

import { CompanyServiceModule } from "@/services/company/companyService.module"
import { ProductServiceModule } from "@/services/product/productService.module"

import { CompanyController } from "./company.controller"
import { ProductController } from "./product.controller"

@Module({
  imports: [CompanyServiceModule, ProductServiceModule],
  controllers: [CompanyController, ProductController]
})
export class ControllerRootModule {}
