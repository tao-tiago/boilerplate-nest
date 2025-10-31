import { IsOptional, IsString } from "class-validator"

export class UpdateProductDTO {
  @IsOptional()
  @IsString()
  name?: string
}
