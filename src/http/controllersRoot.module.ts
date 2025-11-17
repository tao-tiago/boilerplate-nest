import { Module } from "@nestjs/common"

import { AuthModule } from "@/core/infra/auth/auth.module"
import { CompanyServiceModule } from "@/services/company/company.module"
import { ProductServiceModule } from "@/services/product/product.module"
import { UserServiceModule } from "@/services/user/user.module"

import { AuthController } from "./controllers/auth.controller"
import { CompanyController } from "./controllers/company.controller"
import { ProductController } from "./controllers/product.controller"
import { UserController } from "./controllers/user.controller"

@Module({
  imports: [AuthModule, CompanyServiceModule, ProductServiceModule, UserServiceModule],
  controllers: [AuthController, CompanyController, ProductController, UserController]
})
export class ControllerRootModule {}
