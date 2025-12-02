import { Injectable } from "@nestjs/common"
import { hash } from "bcryptjs"

import { Warning } from "@/core/infra/log/warning.class"
import { UserRepository } from "@/repositories/user/user.repository"

import { CreateUserDTO } from "./createUser.dto"

@Injectable()
export class CreateUserService {
  constructor(private userRepository: UserRepository) {}

  async execute(payload: CreateUserDTO) {
    const userExists = await this.userRepository.findByEmail(payload.email)

    if (userExists) {
      throw new Warning("User already exists", 409)
    }

    const passwordHash = await hash(payload.password, 6)

    await this.userRepository.create({
      ...payload,
      password: passwordHash
    })
  }
}
