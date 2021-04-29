import { RedisService } from './redis.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule],
    providers: [RedisService],
    exports: [RedisService]
})
export class RedisModule {}
