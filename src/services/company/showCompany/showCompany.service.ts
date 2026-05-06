import { Injectable, NotFoundException } from "@nestjs/common"

import { LoggerService } from "@/core/infra/log/logger.service"
import { QueryId } from "@/core/shared/helpers/query-options.dto"
import { CompanyRepository } from "@/repositories/company/company.repository"

@Injectable()
export class ShowCompanyService {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly logger: LoggerService
  ) {}

  async execute({ id }: QueryId) {
    this.logger.log(ShowCompanyService.name, {
      operation: "execute"
    })

    const company = await this.companyRepository.findById(id)

    if (!company) {
      throw new NotFoundException("Company not found")
    }

    return company
  }
}
