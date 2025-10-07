import { Injectable, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService extends Redis implements OnModuleDestroy {
  constructor() {
    super({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      db: Number(process.env.REDIS_DB),
    });
  }

  onModuleDestroy() {
    this.disconnect();
  }

  async saveData<T>(key: string, value: T): Promise<void> {
    await this.set(key, JSON.stringify(value), 'EX', 60 * 15);
  }

  async getData<T>(key: string): Promise<T | null> {
    const data = await this.get(key);
    return data ? (JSON.parse(data) as T) : null;
  }

  async deleteData(key: string): Promise<void> {
    await this.del(key);
  }
}
