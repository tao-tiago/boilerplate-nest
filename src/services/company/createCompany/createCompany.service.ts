import { Injectable } from "@nestjs/common"

import { CompanyRepository } from "@/repositories/company/company.repository"

import { CreateCompanyDTO } from "./createCompany.dto"

@Injectable()
export class CreateCompanyService {
  constructor(private companyRepository: CompanyRepository) {}

  async execute(payload: CreateCompanyDTO) {
    const { corporateName, typeCompany, userId } = payload

    await this.companyRepository.create({
      corporateName,
      typeCompany,
      users: { connect: { id: userId } }
    })
  }
}
