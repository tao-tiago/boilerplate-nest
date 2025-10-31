import { Injectable, NotFoundException } from "@nestjs/common"

import { QueryCompanyId } from "@/core/shared/helpers/query-options.dto"
import { CompanyRepository } from "@/repositories/company/company.repository"
import { ProductRepository } from "@/repositories/product/product.repository"

import { CreateProductDTO } from "./createProduct.dto"

@Injectable()
export class CreateProductService {
  constructor(
    private companyRepository: CompanyRepository,
    private productRepository: ProductRepository
  ) {}

  async execute({ name, companyId }: CreateProductDTO & QueryCompanyId) {
    const company = await this.companyRepository.findById(companyId)

    if (!company) {
      throw new NotFoundException("Company not found")
    }

    await this.productRepository.create({
      name,
      company: { connect: { id: companyId } }
    })
  }
}
