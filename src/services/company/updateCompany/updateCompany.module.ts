import { Module } from "@nestjs/common"
import { CompanyRepositoryModule } from "src/repositories/company/company.module"

import { UpdateCompanyService } from "./updateCompany.service"

@Module({
  imports: [CompanyRepositoryModule],
  providers: [UpdateCompanyService],
  exports: [UpdateCompanyService]
})
export class UpdateCompanyModule {}
