import { QueryOptionsDTO } from '@/core/shared/helpers/query-options.dto';
import { OmitBase } from '@/core/shared/helpers/utility-types';
import { TypeCompany } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';

export class CompanyListDTO extends QueryOptionsDTO {
  @IsOptional()
  @IsEnum(TypeCompany)
  typeCompany?: TypeCompany;
}

export type CompanyListFilter = OmitBase<CompanyListDTO, QueryOptionsDTO>;
