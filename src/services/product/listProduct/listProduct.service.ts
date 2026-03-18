import { Injectable } from "@nestjs/common"
import { Prisma } from "@prisma/client"
import { ClsService } from "nestjs-cls"

import { LoggerService } from "@/core/infra/log/logger.service"
import { QueryCompanyId, QueryOptionsResponse } from "@/core/shared/helpers/query-options.dto"
import { entries } from "@/core/shared/utils/entries"
import { ProductRepository } from "@/repositories/product/product.repository"

import { ListProductFilter } from "./listProduct.dto"

@Injectable()
export class ListProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly cls: ClsService,
    private readonly logger: LoggerService
  ) {}

  async execute(payload: QueryOptionsResponse<ListProductFilter> & QueryCompanyId) {
    const correlationId = this.cls.get("correlationId")
    const { companyId, orderBy, order, skip, take, filter } = payload

    this.logger.log({
      correlationId,
      message: "Listing products"
    })

    const where: Prisma.ProductWhereInput = { companyId }
    const specialFilter: (keyof ListProductFilter)[] = []

    entries(filter).forEach(([key, value]) => {
      const isSpecialFilter = specialFilter.includes(key)
      const isNull = value === "null"

      if (isSpecialFilter) {
        Object.assign(where, {
          [key]: {
            in: value.split(",")
          }
        })
      }

      if (isNull) {
        Object.assign(where, {
          [key]: {
            equals: null
          }
        })
      }

      if (!isSpecialFilter && !isNull) {
        Object.assign(where, {
          [key]: {
            contains: value,
            mode: "insensitive"
          }
        })
      }
    })

    return await this.productRepository.list({
      where,
      orderBy: {
        [orderBy]: order
      },
      skip,
      take
    })
  }
}
