import { Module } from "@nestjs/common"

import { CreateCompanyModule } from "./createCompany/createCompany.module"
import { DeleteCompanyModule } from "./deleteCompany/deleteCompany.module"
import { ListCompanyModule } from "./listCompany/listCompany.module"
import { ShowCompanyModule } from "./showCompany/showCompany.module"
import { UpdateCompanyModule } from "./updateCompany/updateCompany.module"

@Module({
  imports: [
    ListCompanyModule,
    CreateCompanyModule,
    ShowCompanyModule,
    UpdateCompanyModule,
    DeleteCompanyModule
  ],
  exports: [
    ListCompanyModule,
    CreateCompanyModule,
    ShowCompanyModule,
    UpdateCompanyModule,
    DeleteCompanyModule
  ]
})
export class CompanyServiceModule {}
