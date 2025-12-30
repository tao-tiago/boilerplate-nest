import { Prisma, Product } from "@prisma/client"

export type IProduct = {
  list(data: Prisma.ProductFindManyArgs): Promise<{
    count: number
    rows: Product[]
  }>
  create(data: Prisma.ProductCreateInput): Promise<Product>
  update(id: string, data: Prisma.ProductUpdateInput): Promise<void>
  delete(id: string): Promise<void>
  findById(id: string, include: Prisma.ProductInclude): Promise<Product | null>
}
