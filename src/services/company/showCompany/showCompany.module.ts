import { Module } from "@nestjs/common"
import { CompanyRepositoryModule } from "src/repositories/company/company.module"

import { ShowCompanyService } from "./showCompany.service"

@Module({
  imports: [CompanyRepositoryModule],
  providers: [ShowCompanyService],
  exports: [ShowCompanyService]
})
export class ShowCompanyModule {}
