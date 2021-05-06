import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { ConfigModule } from '@shared/config/config.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health/health.controller';
import { ConfigurationModule } from './configuration/configuration.module';
import { DatabaseModule } from '@shared/database/database.module';
import { CustomerController } from './controllers/customer.controller';
import { ConfigurationController } from './controllers/configuration.controller';
import { OtpController } from './controllers/otp.controller';
import { CustomerModule } from '@components/customer/customer.module';
import { OtpModule } from '@components/otp/otp.module';

@Module({
    imports: [
        ConfigModule,
        ConfigurationModule,
        TerminusModule,
        DatabaseModule,
        CustomerModule,
        OtpModule
    ],
    controllers: [
        AppController,
        HealthController,
        CustomerController,
        ConfigurationController,
        OtpController
    ],
    providers: [AppService]
})
export class AppModule {}
