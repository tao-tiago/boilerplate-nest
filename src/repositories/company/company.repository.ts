import { Injectable } from "@nestjs/common"
import { Company, Prisma } from "@prisma/client"

import { CacheService } from "@/core/infra/cache/cache.service"
import { DbService } from "@/core/infra/db/db.service"

import { ICompany } from "./company.types"

@Injectable()
export class CompanyRepository implements ICompany {
  constructor(
    private db: DbService,
    private cache: CacheService
  ) {}

  async list(data: Prisma.CompanyFindManyArgs) {
    const [count, rows] = await this.db.$transaction([
      this.db.company.count({
        where: data.where
      }),
      this.db.company.findMany(data)
    ])

    return {
      count,
      rows
    }
  }

  async create(data: Prisma.CompanyCreateInput) {
    const company = await this.db.company.create({ data })

    await this.cache.saveData(`company:${company.id}`, company)
  }

  async update(id: string, data: Prisma.CompanyUpdateInput) {
    const company = await this.db.company.update({
      where: { id },
      data
    })

    await this.cache.saveData(`company:${company.id}`, company)
  }

  async delete(id: string) {
    await this.db.company.delete({
      where: { id }
    })

    await this.cache.deleteData(`company:${id}`)
  }

  async findById(id: string, include: Prisma.CompanyInclude = {}) {
    const isSimpleEntity = Object.entries(include).length === 0

    if (isSimpleEntity) {
      const companyCache = (await this.cache.getData(`company:${id}`)) as Company

      if (companyCache) {
        return companyCache
      }
    }

    const company = await this.db.company.findUnique({
      where: { id },
      include
    })

    if (isSimpleEntity) {
      await this.cache.saveData(`company:${id}`, company)
    }

    return company
  }
}
