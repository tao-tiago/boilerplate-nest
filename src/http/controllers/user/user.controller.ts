import { Body, Controller, Get, Logger, Post, Query } from "@nestjs/common"

import { Public } from "@/core/infra/auth/decorators/public.decorator"
import { filters } from "@/core/shared/utils/filters"
import { CreateUserDTO } from "@/services/user/createUser/createUser.dto"
import { CreateUserService } from "@/services/user/createUser/createUser.service"
import { ListUserDTO, ListUserFilter } from "@/services/user/listUser/listUser.dto"
import { ListUserService } from "@/services/user/listUser/listUser.service"

@Controller("api/v1/users")
export class UserController {
  private readonly logger = new Logger(UserController.name)

  constructor(
    private listUserService: ListUserService,
    private createUserService: CreateUserService
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
