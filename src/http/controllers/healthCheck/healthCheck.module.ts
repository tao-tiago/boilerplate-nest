import { Module } from "@nestjs/common"
import { TerminusModule } from "@nestjs/terminus"

import { CacheModule } from "@/core/infra/cache/cache.module"
import { DbModule } from "@/core/infra/db/db.module"

import { HealthCheckController } from "./healthCheck.controller"

@Module({
  imports: [TerminusModule, DbModule, CacheModule],
  controllers: [HealthCheckController]
})
export class HealthCheckModule {}
