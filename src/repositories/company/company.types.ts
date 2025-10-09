import { Company, Prisma } from "@prisma/client"

export type ICompany = {
  list(payload: Prisma.CompanyFindManyArgs): Promise<{
    count: number
    rows: Company[]
  }>
  /*
  create (data: ICompanyDTO): Promise<string[]>
  get (id: string): Promise<ICompanyResponse>
  update (data: ICompanyUpdate): Promise<string[]>
  delete (id: string): Promise<string[]>
  findById (id: string): Promise<ICompanyResponse | null>
  */
}
