import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { ConfigModule } from '@shared/config.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health/health.controller';
import { ConfigurationModule } from './configuration/configuration.module';
import { DatabaseModule } from '@shared/database/database.module';
// import { RedisModule } from '@shared/redis/redis.module';

@Module({
    imports: [
        ConfigModule,
        ConfigurationModule,
        TerminusModule,
        DatabaseModule
        // RedisModule
    ],
    controllers: [AppController, HealthController],
    providers: [AppService]
})
export class AppModule {}
