import { Company } from '@prisma/client';

export type ICompany = {
  list(data: any): Promise<{
    count: number;
    rows: Company[];
  }>;
  /*
  create (data: ICompanyDTO): Promise<string[]>
  get (id: string): Promise<ICompanyResponse>
  update (data: ICompanyUpdate): Promise<string[]>
  delete (id: string): Promise<string[]>
  findById (id: string): Promise<ICompanyResponse | null>
  */
};
