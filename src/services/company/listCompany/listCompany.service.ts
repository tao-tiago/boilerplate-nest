import { Injectable } from "@nestjs/common"
import { Prisma } from "@prisma/client"

import { QueryOptionsResponse } from "@/core/shared/helpers/query-options.dto"
import { entries } from "@/core/shared/utils/entries"
import { CompanyRepository } from "@/repositories/company/company.repository"

import { ListCompanyFilter } from "./listCompany.dto"

@Injectable()
export class ListCompanyService {
  constructor(private companyRepository: CompanyRepository) {}

  async execute(payload: QueryOptionsResponse<ListCompanyFilter>) {
    const { orderBy, order, skip, take, filter } = payload

    const where: Prisma.CompanyWhereInput = {}
    const specialFilter: (keyof ListCompanyFilter)[] = ["typeCompany"]

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

    return await this.companyRepository.list({
      where,
      orderBy: {
        [orderBy]: order
      },
      skip,
      take
    })
  }
}
