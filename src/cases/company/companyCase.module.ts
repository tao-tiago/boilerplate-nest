import { Module } from "@nestjs/common"
import { CompanyRepositoryModule } from "src/repositories/company/companyRepository.module"

import { CompanyCreateUseCase } from "./companyCreate/companyCreate.useCase"
import { CompanyListUseCase } from "./companyList/companyList.useCase"

@Module({
  imports: [CompanyRepositoryModule],
  providers: [CompanyListUseCase, CompanyCreateUseCase],
  exports: [CompanyListUseCase, CompanyCreateUseCase]
})
export class CompanyCaseModule {}
