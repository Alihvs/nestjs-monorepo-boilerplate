import { SentryModule as SModule } from '@ntegral/nestjs-sentry';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const SentryModule = SModule.forRootAsync({
    imports: [ConfigModule],
    async useFactory (config: ConfigService) {
        const env = config.get('ENV');
        return {
            dsn: config.get('SENTRY_DSN'),
            debug: env === 'development',
            environment: env
        }
    },
    inject: [ConfigService]
})
