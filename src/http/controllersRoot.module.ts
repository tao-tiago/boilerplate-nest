import { Module } from "@nestjs/common"

import { CompanyServiceModule } from "@/services/company/companyService.module"
import { ProductServiceModule } from "@/services/product/productService.module"

import { CompanyController } from "./controllers/company.controller"
import { ProductController } from "./controllers/product.controller"

@Module({
  imports: [CompanyServiceModule, ProductServiceModule],
  controllers: [CompanyController, ProductController]
})
export class ControllerRootModule {}
