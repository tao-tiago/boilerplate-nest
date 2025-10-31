import { Module } from "@nestjs/common"
import { CompanyRepositoryModule } from "src/repositories/company/companyRepository.module"

import { CreateCompanyService } from "./createCompany/createCompany.service"
import { DeleteCompanyService } from "./deleteCompany/deleteCompany.service"
import { ListCompanyService } from "./listCompany/listCompany.service"
import { ShowCompanyService } from "./showCompany/showCompany.service"
import { UpdateCompanyService } from "./updateCompany/updateCompany.service"

@Module({
  imports: [CompanyRepositoryModule],
  providers: [
    ListCompanyService,
    CreateCompanyService,
    ShowCompanyService,
    UpdateCompanyService,
    DeleteCompanyService
  ],
  exports: [
    ListCompanyService,
    CreateCompanyService,
    ShowCompanyService,
    UpdateCompanyService,
    DeleteCompanyService
  ]
})
export class CompanyServiceModule {}
