import { Company, Prisma } from "@prisma/client"

export type ICompany = {
  list(data: Prisma.CompanyFindManyArgs): Promise<{
    count: number
    rows: Company[]
  }>
  create(data: Prisma.CompanyCreateInput): Promise<void>
  update(id: string, data: Prisma.CompanyUpdateInput): Promise<void>
  delete(id: string): Promise<void>
  findById(id: string, include: Prisma.CompanyInclude): Promise<Company | null>
}
