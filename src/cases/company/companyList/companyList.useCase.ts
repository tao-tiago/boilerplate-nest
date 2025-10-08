/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CompanyRepository } from 'src/repositories/company/company.repository';

@Injectable()
export class CompanyListUseCase {
  constructor(private companyRepository: CompanyRepository) {}

  async execute(payload: any) {
    const { orderBy, order, skip, take, filter } = payload;

    const where: Prisma.CompanyWhereInput = {};

    const specialFilter = ['typeCompany'];

    Object.entries(filter).forEach(([key, value]) => {
      if (specialFilter.includes(key) && key === 'typeCompany') {
        /*
        const typeCompanyMulti = value.split(",")
        
        const typeCompanyMultiCheck = typeCompanyMulti.map((typeCompany) => {
          if (!Object.values(TypeCompany).includes(typeCompany as TypeCompany)) {
            throw new Warning("Tipo de Empresa inválido", 400)
          }

          return typeCompany
        })

        Object.assign(where, {
          typeCompany: {
            in: typeCompanyMultiCheck
          }
        })
        */
      }

      const isNull = value === 'null';

      if (isNull) {
        Object.assign(where, {
          [key]: {
            equals: null,
          },
        });
      }

      if (!isNull && !specialFilter) {
        Object.assign(where, {
          [key]: {
            contains: value,
            mode: 'insensitive',
          },
        });
      }
    });

    return await this.companyRepository.list({
      where,
      orderBy: {
        [orderBy]: order,
      },
      skip,
      take,
    });
  }
}
