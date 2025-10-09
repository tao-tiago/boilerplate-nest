import { Module } from "@nestjs/common"
import { CompanyCaseModule } from "src/cases/company/companyCase.module"

import { CompanyController } from "./company.controller"

@Module({
  imports: [CompanyCaseModule],
  controllers: [CompanyController]
})
export class ControllerRootModule {}
