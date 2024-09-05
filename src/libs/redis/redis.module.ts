import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';

import { RedisOptions } from './configs/redis.option';

@Module({
  imports: [CacheModule.registerAsync(RedisOptions)],
  providers: [],
  exports: [CacheModule],
})
export class RedisModule {}
