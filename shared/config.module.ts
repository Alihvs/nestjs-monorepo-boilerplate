import { ConfigModule as Config } from '@nestjs/config';

export const ConfigModule = Config.forRoot({
    isGlobal: true,
    envFilePath: [
        '.env.local',
        '.env.' + (process.env.NODE_ENV || 'development'),
        '.env'
    ]
});
