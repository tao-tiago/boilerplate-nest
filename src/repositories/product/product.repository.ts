import { Injectable } from "@nestjs/common"
import { Prisma, Product } from "@prisma/client"

import { CacheService } from "@/core/infra/cache/cache.service"
import { DbService } from "@/core/infra/db/db.service"

import { IProduct } from "./product.types"

@Injectable()
export class ProductRepository implements IProduct {
  constructor(
    private db: DbService,
    private cache: CacheService
  ) {}

  async list(data: Prisma.ProductFindManyArgs) {
    const [count, rows] = await this.db.$transaction([
      this.db.product.count({
        where: data.where
      }),
      this.db.product.findMany(data)
    ])

    return {
      count,
      rows
    }
  }

  async create(data: Prisma.ProductCreateInput) {
    const product = await this.db.product.create({ data })

    await this.cache.saveData(`product:${product.id}`, product)

    return product
  }

  async update(id: string, data: Prisma.ProductUpdateInput) {
    const product = await this.db.product.update({
      where: { id },
      data
    })

    await this.cache.saveData(`product:${product.id}`, product)
  }

  async delete(id: string) {
    await this.db.product.delete({
      where: { id }
    })

    await this.cache.deleteData(`product:${id}`)
  }

  async findById(id: string, include: Prisma.ProductInclude = {}) {
    const isSimpleEntity = Object.entries(include).length === 0

    if (isSimpleEntity) {
      const productCache = (await this.cache.getData(`product:${id}`)) as Product

      if (productCache) {
        return productCache
      }
    }

    const product = await this.db.product.findUnique({
      where: { id },
      include
    })

    if (isSimpleEntity) {
      await this.cache.saveData(`product:${id}`, product)
    }

    return product
  }
}
