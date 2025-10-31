import { Injectable, OnModuleDestroy } from "@nestjs/common"
import Redis from "ioredis"

import { REDIS_DB, REDIS_HOST, REDIS_PORT } from "@/core/constants"

@Injectable()
export class CacheService extends Redis implements OnModuleDestroy {
  constructor() {
    super({
      host: REDIS_HOST,
      port: REDIS_PORT,
      db: REDIS_DB
    })
  }

  onModuleDestroy() {
    this.disconnect()
  }

  async saveData<T>(key: string, value: T): Promise<void> {
    await this.set(key, JSON.stringify(value), "EX", 60 * 15)
  }

  async getData<T>(key: string): Promise<T | null> {
    const data = await this.get(key)
    return data ? (JSON.parse(data) as T) : null
  }

  async deleteData(key: string): Promise<void> {
    await this.del(key)
  }
}
