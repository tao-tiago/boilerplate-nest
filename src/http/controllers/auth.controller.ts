import { Body, Controller, Post } from "@nestjs/common"

import { Public } from "@/core/infra/auth/decorators/public.decorator"
import { AuthDTO } from "@/core/infra/auth/services/auth.dto"
import { AuthService } from "@/core/infra/auth/services/auth.service"

@Controller("api/v1/auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post()
  async auth(@Body() body: AuthDTO) {
    return await this.authService.execute(body)
  }
}
