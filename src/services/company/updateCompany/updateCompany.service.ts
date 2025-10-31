import { Injectable, NotFoundException } from "@nestjs/common"

import { QueryId } from "@/core/shared/helpers/query-options.dto"
import { CompanyRepository } from "@/repositories/company/company.repository"

import { UpdateCompanyDTO } from "./updateCompany.dto"

@Injectable()
export class UpdateCompanyService {
  constructor(private companyRepository: CompanyRepository) {}

  async execute({ id, ...payload }: UpdateCompanyDTO & QueryId) {
    const company = await this.companyRepository.findById(id)

    if (!company) {
      throw new NotFoundException("Company not found")
    }

    await this.companyRepository.update(id, payload)
  }
}
