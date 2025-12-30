import { Module } from "@nestjs/common"
import { CompanyRepositoryModule } from "src/repositories/company/company.module"

import { DeleteCompanyService } from "./deleteCompany.service"

@Module({
  imports: [CompanyRepositoryModule],
  providers: [DeleteCompanyService],
  exports: [DeleteCompanyService]
})
export class DeleteCompanyModule {}
