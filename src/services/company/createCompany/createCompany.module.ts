import { Module } from "@nestjs/common"
import { CompanyRepositoryModule } from "src/repositories/company/company.module"

import { CreateCompanyService } from "./createCompany.service"

@Module({
  imports: [CompanyRepositoryModule],
  providers: [CreateCompanyService],
  exports: [CreateCompanyService]
})
export class CreateCompanyModule {}
