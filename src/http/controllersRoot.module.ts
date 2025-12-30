import { Module } from "@nestjs/common"

import { AuthControllerModule } from "./controllers/auth/auth.module"
import { CompanyControllerModule } from "./controllers/company/company.module"
import { ProductControllerModule } from "./controllers/product/product.module"
import { UserControllerModule } from "./controllers/user/user.module"

@Module({
  imports: [AuthControllerModule, CompanyControllerModule, ProductControllerModule, UserControllerModule]
})
export class ControllersRootModule {}
