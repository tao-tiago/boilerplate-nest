import { Injectable, NotFoundException } from "@nestjs/common"

import { QueryId } from "@/core/shared/helpers/query-options.dto"
import { ProductRepository } from "@/repositories/product/product.repository"

@Injectable()
export class ShowProductService {
  constructor(private productRepository: ProductRepository) {}

  async execute({ id }: QueryId) {
    const product = await this.productRepository.findById(id)

    if (!product) {
      throw new NotFoundException("Product not found")
    }

    return product
  }
}
