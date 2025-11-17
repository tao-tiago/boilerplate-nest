import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string
}
