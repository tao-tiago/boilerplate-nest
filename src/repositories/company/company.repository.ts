import { Prisma } from '@prisma/client';
import { ICompany } from './company.types';
import { PrismaService } from 'src/services/prisma/prisma.service';

export class CompanyRepository implements ICompany {
  constructor(private prisma: PrismaService) {}

  companyList = async (payload: Prisma.CompanyFindManyArgs) => {
    const [count, rows] = await this.prisma.$transaction([
      this.prisma.company.count({
        where: payload.where,
      }),
      this.prisma.company.findMany(payload),
    ]);

    return {
      count,
      rows,
    };
  };

  /*
  createCompany = async (payload: ICompanyDTO) => {
    const { corporateName, typeCompany } = payload

    const request = new ICompanyValidator({ corporateName, typeCompany })

    const errors = await validate(request)

    if (errors.length > 0) { throw new Warning(errors, 400) }

    try {
      const createdAt = dateTransform({ format: "yyyy-mm-ddThh:MM:ssZ" })

      await this.prisma.Company.create({
        data: {
          corporateName,
          typeCompany,
          createdAt
        }
      })

      return ["Fornecedor cadastrado com sucesso"]
    } catch (error) {
      throw new Warning(
        "Não foi possível cadastrar o fornecedor!", 500, {
        payload,
        operation: "CompanyRepository Class | createCompany()",
        errorMessage: error.message,
        stack: error.stack
      })
    }
  }

  getCompany = async (id: string) => {
    const Company = await this.findCompanyById(id)

    if (!Company) { throw new Warning("O fornecedor não foi encontrado!", 404) }

    return Company
  }

  updateCompany = async (payload: ICompanyUpdate) => {
    const { id, corporateName, typeCompany } = payload

    const request = new ICompanyValidator({ corporateName, typeCompany })

    const errors = await validate(request)

    if (errors.length > 0) { throw new Warning(errors, 400) }

    await this.findCompanyById(id)

    try {
      await this.prisma.Company.update({
        where: {
          id
        },
        data: {
          corporateName,
          typeCompany
        }
      })

      return ["Fornecedor atualizado com sucesso"]
    } catch (error) {
      throw new Warning(
        "Não foi possível atualizar o fornecedor!", 500, {
        payload,
        operation: "CompanyRepository Class | updateCompany()",
        errorMessage: error.message,
        stack: error.stack
      })
    }
  }

  deleteCompany = async (id: string) => {
    await this.findCompanyById(id)

    try {
      await this.prisma.Company.delete({
        where: {
          id
        }
      })

      return ["Fornecedor excluído com sucesso"]
    } catch (error) {
      throw new Warning(
        "Não foi possível atualizar o fornecedor!", 500, {
        operation: "CompanyRepository Class | deleteCompany()",
        errorMessage: error.message,
        stack: error.stack
      })
    }
  }

  findCompanyById = async (id: string) => {
    return await this.prisma.Company.findUnique({
      where: {
        id
      }
    })
  }
  */
}
