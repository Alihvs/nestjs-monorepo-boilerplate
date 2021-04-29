import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { ConfigModule } from '@shared/config.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health/health.controller';
import { ConfigurationModule } from './configuration/configuration.module';
import { DatabaseModule } from '@shared/database/database.module';
import { CustomerModule } from 'components/customer/customer.module';
import { CustomerController } from './controllers/customer.controller';
import { ConfigurationController } from './controllers/configuration.controller';
// import { RedisModule } from '@shared/redis/redis.module';

@Module({
    imports: [
        ConfigModule,
        ConfigurationModule,
        TerminusModule,
        DatabaseModule,
        CustomerModule
        // RedisModule
    ],
    controllers: [AppController, HealthController, CustomerController, ConfigurationController],
    providers: [AppService]
})
export class AppModule {}
