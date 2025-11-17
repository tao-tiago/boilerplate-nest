import { IsNotEmpty } from "class-validator"

export class AuthDTO {
  @IsNotEmpty()
  user: string

  @IsNotEmpty()
  password: string
}
