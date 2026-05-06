import { TypeCompany } from "@prisma/client"
import { IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator"

export class CreateCompanyDTO {
  @IsNotEmpty()
  @IsUUID()
  userId!: string

  @IsNotEmpty()
  @IsString()
  corporateName!: string

  @IsEnum(TypeCompany)
  typeCompany!: TypeCompany
}
