import { Injectable } from "@nestjs/common"
import { Prisma } from "@prisma/client"

import { PrismaService } from "@/services/prisma/prisma.service"

import { ICompany } from "./company.types"

@Injectable()
export class CompanyRepository implements ICompany {
  constructor(private prisma: PrismaService) {}

  async list(payload: Prisma.CompanyFindManyArgs) {
    const [count, rows] = await this.prisma.$transaction([
      this.prisma.company.count({
        where: payload.where
      }),
      this.prisma.company.findMany(payload)
    ])

    return {
      count,
      rows
    }
  }
}
