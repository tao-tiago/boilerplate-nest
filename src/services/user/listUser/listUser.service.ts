import { Injectable, Logger } from "@nestjs/common"
import { Prisma } from "@prisma/client"

import { QueryOptionsResponse } from "@/core/shared/helpers/query-options.dto"
import { UserRepository } from "@/repositories/user/user.repository"

import { ListUserFilter } from "./listUser.dto"

@Injectable()
export class ListUserService {
  private readonly logger = new Logger(ListUserService.name)

  constructor(private userRepository: UserRepository) {}
  async execute(payload: QueryOptionsResponse<ListUserFilter>) {
    this.logger.log("List Users in Service", { operation: "ListUserService.execute" })

    const { orderBy, order, skip, take } = payload

    const where: Prisma.UserWhereInput = {}

    return await this.userRepository.list({
      where,
      orderBy: {
        [orderBy]: order
      },
      skip,
      take,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true
      }
    })
  }
}
