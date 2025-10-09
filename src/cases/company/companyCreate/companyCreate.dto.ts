import { TypeCompany } from "@prisma/client"
import { IsEnum, IsNotEmpty, IsString } from "class-validator"

export class CompanyCreateDTO {
  @IsNotEmpty()
  @IsString()
  corporateName: string

  @IsEnum(TypeCompany)
  typeCompany: TypeCompany
}
