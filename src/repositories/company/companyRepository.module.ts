import { Module } from "@nestjs/common"

import { PrismaModule } from "@/services/prisma/prisma.module"

import { CompanyRepository } from "./company.repository"

@Module({
  imports: [PrismaModule],
  providers: [CompanyRepository],
  exports: [CompanyRepository]
})
export class CompanyRepositoryModule {}
