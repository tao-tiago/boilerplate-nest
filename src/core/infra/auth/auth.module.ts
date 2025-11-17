import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"
import { PassportModule } from "@nestjs/passport"

import { JWT_EXPIRATION, JWT_SECRET } from "@/core/constants"
import { UserRepositoryModule } from "@/repositories/user/user.module"

import { AuthService } from "./services/auth.service"
import { JwtStrategy } from "./strategies/jwt.strategy"

@Module({
  imports: [
    UserRepositoryModule,
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: JWT_EXPIRATION }
    })
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
