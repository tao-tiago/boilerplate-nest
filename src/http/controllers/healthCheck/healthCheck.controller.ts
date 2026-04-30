import { Controller, Get } from "@nestjs/common"
import { ApiOperation, ApiTags } from "@nestjs/swagger"
import { HealthCheck, HealthCheckService, PrismaHealthIndicator } from "@nestjs/terminus"

import { Public } from "@/core/infra/auth/decorators/public.decorator"
import { CacheService } from "@/core/infra/cache/cache.service"
import { DbService } from "@/core/infra/db/db.service"

@ApiTags("HealthCheck")
@Controller("health-check")
export class HealthCheckController {
  constructor(
    private healthCheck: HealthCheckService,
    private prismaHealthIndicator: PrismaHealthIndicator,
    private prisma: DbService,
    private cache: CacheService
  ) {}

  @ApiOperation({
    description: "Simply returns OK if the service is up. Doesn't require authentication tokens"
  })
  @Get()
  @Public()
  @HealthCheck()
  async checkGet() {
    return await this.healthCheck.check([
      () => this.prismaHealthIndicator.pingCheck("database", this.prisma),
      async () => {
        const result = await this.cache.ping()

        if (result !== "PONG") {
          throw new Error("Redis not responding")
        }

        return { redis: { status: "up" } }
      }
    ])
  }
}
