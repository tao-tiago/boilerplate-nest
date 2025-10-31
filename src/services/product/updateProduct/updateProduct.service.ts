import { Injectable, NotFoundException } from "@nestjs/common"

import { QueryId } from "@/core/shared/helpers/query-options.dto"
import { ProductRepository } from "@/repositories/product/product.repository"

import { UpdateProductDTO } from "./updateProduct.dto"

@Injectable()
export class UpdateProductService {
  constructor(private productRepository: ProductRepository) {}

  async execute({ id, ...payload }: UpdateProductDTO & QueryId) {
    const product = await this.productRepository.findById(id)

    if (!product) {
      throw new NotFoundException("Product not found")
    }

    await this.productRepository.update(id, payload)
  }
}
