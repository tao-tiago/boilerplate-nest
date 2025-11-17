import { Injectable, UnauthorizedException } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { compare } from "bcryptjs"

import { UserRepository } from "@/repositories/user/user.repository"

import { AuthDTO } from "./auth.dto"

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) {}

  async execute(payload: AuthDTO) {
    const user = await this.userRepository.findByEmail(payload.user)

    if (!user) {
      throw new UnauthorizedException()
    }

    const isMatch = await compare(payload.password, user.password)

    if (!isMatch) {
      throw new UnauthorizedException()
    }

    const token = this.jwtService.sign({ id: user.id, email: user.email })

    return { token }
  }
}
