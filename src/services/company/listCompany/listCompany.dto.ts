import { TypeCompany } from "@prisma/client"
import { IsEnum, IsOptional, IsString } from "class-validator"

import { QueryOptionsDTO } from "@/core/shared/helpers/query-options.dto"
import { OmitBase } from "@/core/shared/helpers/utility-types"

export class ListCompanyDTO extends QueryOptionsDTO {
  @IsOptional()
  @IsString()
  corporateName?: string

  @IsOptional()
  @IsEnum(TypeCompany)
  typeCompany?: TypeCompany
}

export type ListCompanyFilter = OmitBase<ListCompanyDTO, QueryOptionsDTO>
