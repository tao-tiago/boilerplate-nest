import { Company } from '@prisma/client';

export type ICompany = {
  companyList(data: any): Promise<{
    count: number;
    rows: Company[];
  }>;
  /*
  companyCreate (data: ICompanyDTO): Promise<string[]>
  companyGet (id: string): Promise<ICompanyResponse>
  companyUpdate (data: ICompanyUpdate): Promise<string[]>
  companyDelete (id: string): Promise<string[]>
  companyFindById (id: string): Promise<ICompanyResponse | null>
  */
};
