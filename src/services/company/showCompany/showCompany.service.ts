import { Injectable, NotFoundException } from "@nestjs/common"

import { QueryId } from "@/core/shared/helpers/query-options.dto"
import { CompanyRepository } from "@/repositories/company/company.repository"

@Injectable()
export class ShowCompanyService {
  constructor(private companyRepository: CompanyRepository) {}

  async execute({ id }: QueryId) {
    const company = await this.companyRepository.findById(id)

    if (!company) {
      throw new NotFoundException("Company not found")
    }

    return company
  }
}
