import { Module } from "@nestjs/common"
import { CompanyRepositoryModule } from "src/repositories/company/company.module"

import { ListCompanyService } from "./listCompany.service"

@Module({
  imports: [CompanyRepositoryModule],
  providers: [ListCompanyService],
  exports: [ListCompanyService]
})
export class ListCompanyModule {}
