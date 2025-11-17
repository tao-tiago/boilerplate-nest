import { Injectable } from "@nestjs/common"
import { Prisma } from "@prisma/client"

import { QueryOptionsResponse } from "@/core/shared/helpers/query-options.dto"
import { UserRepository } from "@/repositories/user/user.repository"

import { ListUserFilter } from "./listUser.dto"

@Injectable()
export class ListUserService {
  constructor(private userRepository: UserRepository) {}
  async execute(payload: QueryOptionsResponse<ListUserFilter>) {
    const { orderBy, order, skip, take } = payload

    const where: Prisma.UserWhereInput = {}

    return await this.userRepository.list({
      where,
      orderBy: {
        [orderBy]: order
      },
      skip,
      take
    })
  }
}
