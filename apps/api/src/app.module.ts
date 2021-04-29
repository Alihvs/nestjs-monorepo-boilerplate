import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { ConfigModule } from '@shared/config.module';
import { SentryModule } from '@shared/sentry/sentry.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health/health.controller';
import { ConfigurationModule } from './configuration/configuration.module';
import { RedisModule } from '@shared/redis/redis.module';
import { DatabaseModule } from '@shared/database/database.module';

@Module({
    imports: [
        ConfigModule,
        ConfigurationModule,
        SentryModule,
        TerminusModule,
        DatabaseModule,
        RedisModule
    ],
    controllers: [AppController, HealthController],
    providers: [AppService]
})
export class AppModule {}
