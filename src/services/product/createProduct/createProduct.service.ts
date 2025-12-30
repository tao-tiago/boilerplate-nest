import { Injectable, NotFoundException } from "@nestjs/common"

import { StreamProducer } from "@/core/infra/stream/stream.producer"
import { QueryCompanyId } from "@/core/shared/helpers/query-options.dto"
import { CompanyRepository } from "@/repositories/company/company.repository"
import { ProductRepository } from "@/repositories/product/product.repository"

import { CreateProductDTO } from "./createProduct.dto"

@Injectable()
export class CreateProductService {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly productRepository: ProductRepository,
    private readonly streamProducer: StreamProducer
  ) {}

  async execute({ name, companyId }: CreateProductDTO & QueryCompanyId) {
    const company = await this.companyRepository.findById(companyId)

    if (!company) {
      throw new NotFoundException("Company not found")
    }

    const product = await this.productRepository.create({
      name,
      company: { connect: { id: companyId } }
    })

    await this.streamProducer.publish({
      queue: "AUDITORY_MAIN",
      payload: {
        type: "product.created",
        correlationId: product.id,
        productId: product.id,
        productName: product.name
      }
    })
  }
}
