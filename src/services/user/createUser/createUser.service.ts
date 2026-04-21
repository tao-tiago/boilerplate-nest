import { HttpException, HttpStatus, Injectable } from "@nestjs/common"

import { generateHash } from "@/core/shared/helpers/hash"
import { UserRepository } from "@/repositories/user/user.repository"

import { CreateUserDTO } from "./createUser.dto"

@Injectable()
export class CreateUserService {
  constructor(private userRepository: UserRepository) {}

  async execute(payload: CreateUserDTO) {
    const userExists = await this.userRepository.findByEmail(payload.email)

    if (userExists) {
      throw new HttpException("User already exists", HttpStatus.CONFLICT)
    }

    const hash = generateHash(payload.password)

    await this.userRepository.create({
      ...payload,
      password: hash
    })
  }
}
