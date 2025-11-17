import { Prisma, User } from "@prisma/client"

export type IUser = {
  list(data: Prisma.UserFindManyArgs): Promise<{
    count: number
    rows: User[]
  }>
  create(data: Prisma.UserCreateInput): Promise<void>
  findById(id: string, include: Prisma.UserInclude): Promise<User | null>
  findByEmail(email: string, include: Prisma.UserInclude): Promise<User | null>
}
