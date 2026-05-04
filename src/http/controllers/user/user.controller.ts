import { Body, Controller, Get, Post, Query } from "@nestjs/common"

import { Public } from "@/core/infra/auth/decorators/public.decorator"
import { LoggerService } from "@/core/infra/log/logger.service"
import { filters } from "@/core/shared/utils/filters"
import { CreateUserDTO } from "@/services/user/createUser/createUser.dto"
import { CreateUserService } from "@/services/user/createUser/createUser.service"
import { ListUserDTO, ListUserFilter } from "@/services/user/listUser/listUser.dto"
import { ListUserService } from "@/services/user/listUser/listUser.service"

@Controller("users")
export class UserController {
  constructor(
    private readonly listUserService: ListUserService,
    private readonly createUserService: CreateUserService,
    private readonly logger: LoggerService
  ) {}

  @Get()
  async listUsers(@Query() query: ListUserDTO) {
    this.logger.log("List Users in Controller", {
      operation: "UserController.listUsers",
      method: "GET",
      payload: query
    })

    const payload = filters<ListUserFilter>(query)

    return await this.listUserService.execute(payload)
  }

  @Public()
  @Post()
  async createUser(@Body() body: CreateUserDTO) {
    await this.createUserService.execute(body)

    return {
      message: ["User created successfully"]
    }
  }
}
