import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common"

import { Role } from "@/core/infra/auth/contracts/roles.enum"
import { AllowRoles } from "@/core/infra/auth/decorators/roles.decorator"
import { LoggerService } from "@/core/infra/log/logger.service"
import { QueryId } from "@/core/shared/helpers/query-options.dto"
import { filters } from "@/core/shared/utils/filters"
import { CreateCompanyDTO } from "@/services/company/createCompany/createCompany.dto"
import { CreateCompanyService } from "@/services/company/createCompany/createCompany.service"
import { DeleteCompanyService } from "@/services/company/deleteCompany/deleteCompany.service"
import { ListCompanyDTO, ListCompanyFilter } from "@/services/company/listCompany/listCompany.dto"
import { ListCompanyService } from "@/services/company/listCompany/listCompany.service"
import { ShowCompanyService } from "@/services/company/showCompany/showCompany.service"
import { UpdateCompanyDTO } from "@/services/company/updateCompany/updateCompany.dto"
import { UpdateCompanyService } from "@/services/company/updateCompany/updateCompany.service"

@Controller("api/v1/companies")
export class CompanyController {
  constructor(
    private logger: LoggerService,
    private listCompanyService: ListCompanyService,
    private createCompanyService: CreateCompanyService,
    private showCompanyService: ShowCompanyService,
    private updateCompanyService: UpdateCompanyService,
    private deleteCompanyService: DeleteCompanyService
  ) {}

  @AllowRoles(Role.Admin)
  @Get()
  async listCompanies(@Query() query: ListCompanyDTO) {
    const payload = filters<ListCompanyFilter>(query)

    return await this.listCompanyService.execute(payload)
  }

  @Post()
  async createCompany(@Body() body: CreateCompanyDTO) {
    await this.createCompanyService.execute(body)

    return {
      message: ["Company created successfully"]
    }
  }

  @Get(":id")
  async showCompany(@Param() param: QueryId) {
    this.logger.log({ operation: "CompanyController.showCompany", method: "GET", payload: param })

    return await this.showCompanyService.execute(param)
  }

  @Put(":id")
  async updateCompany(@Param() param: QueryId, @Body() body: UpdateCompanyDTO) {
    await this.updateCompanyService.execute({ ...param, ...body })

    return {
      message: ["Company updated successfully"]
    }
  }

  @Delete(":id")
  async deleteCompany(@Param() param: QueryId) {
    await this.deleteCompanyService.execute(param)

    return {
      message: ["Company deleted successfully"]
    }
  }
}
