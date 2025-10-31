import { TypeCompany } from "@prisma/client"
import { IsEnum, IsNotEmpty, IsString } from "class-validator"

export class CreateCompanyDTO {
  @IsNotEmpty()
  @IsString()
  corporateName: string

  @IsEnum(TypeCompany)
  typeCompany: TypeCompany
}
