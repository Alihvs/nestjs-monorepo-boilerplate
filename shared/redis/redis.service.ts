import redis = require('redis');
import { Injectable } from '@nestjs/common';
import { isJsonString } from '@shared/utils/string';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisService {
    client: redis.RedisClient;
    constructor(private readonly configService: ConfigService) {
        const redisUrl = this.configService.get<string>('REDIS_URI');
        this.client = redis.createClient(redisUrl);
    }

    async set(key: string, value: any): Promise<void> {
        if (typeof value === 'object') {
            value = JSON.stringify(value);
        }
        return new Promise((resolve) => {
            this.client.set(key, value.toString(), () => {
                resolve();
            });
        });
    }

    async setWithTTL(key: string, value: any, timeInSeconds: number) {
        if (typeof value === 'object') {
            value = JSON.stringify(value);
        }
        this.client.set(key, value, 'EX', timeInSeconds);
    }

    async get(key: string): Promise<any> {
        return new Promise((resolve) => {
            this.client.get(key, (error, value) =>
                error ? resolve(null) : resolve(isJsonString(value) ? JSON.parse(value) : value)
            );
        });
    }
}
