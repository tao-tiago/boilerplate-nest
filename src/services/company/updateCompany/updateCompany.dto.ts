import { TypeCompany } from "@prisma/client"
import { IsEnum, IsOptional, IsString } from "class-validator"

export class UpdateCompanyDTO {
  @IsOptional()
  @IsString()
  corporateName?: string

  @IsOptional()
  @IsEnum(TypeCompany)
  typeCompany?: TypeCompany
}
