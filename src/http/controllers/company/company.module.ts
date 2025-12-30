import { Module } from "@nestjs/common"

import { CompanyServiceModule } from "@/services/company/company.module"

import { CompanyController } from "./company.controller"

@Module({
  imports: [CompanyServiceModule],
  controllers: [CompanyController]
})
export class CompanyControllerModule {}
