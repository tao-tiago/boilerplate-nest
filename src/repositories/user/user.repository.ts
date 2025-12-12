import { Injectable } from "@nestjs/common"
import { Prisma, User } from "@prisma/client"

import { CacheService } from "@/core/infra/cache/cache.service"
import { DbService } from "@/core/infra/db/db.service"
import { LoggerService } from "@/core/infra/log/logger.service"

import { IUser } from "./user.types"

@Injectable()
export class UserRepository implements IUser {
  constructor(
    private logger: LoggerService,
    private db: DbService,
    private cache: CacheService
  ) {}

  async list(data: Prisma.UserFindManyArgs) {
    this.logger.log({ message: "List Users in Repository", operation: "UserRepository.list" })

    const [count, rows] = await this.db.$transaction([
      this.db.user.count({
        where: data.where
      }),
      this.db.user.findMany(data)
    ])

    return {
      count,
      rows
    }
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await this.db.user.create({ data })

    await this.cache.saveData(`user:${user.id}`, user)
  }

  async findById(id: string, include: Prisma.UserInclude = {}) {
    const isSimpleEntity = Object.entries(include).length === 0

    if (isSimpleEntity) {
      const userCache = (await this.cache.getData(`user:${id}`)) as User

      if (userCache) {
        return userCache
      }
    }

    const user = await this.db.user.findUnique({
      where: { id },
      include
    })

    if (isSimpleEntity) {
      await this.cache.saveData(`user:${id}`, user)
    }

    return user
  }

  async findByEmail(email: string, include: Prisma.UserInclude = {}) {
    const user = await this.db.user.findUnique({
      where: { email },
      include
    })

    return user
  }
}
