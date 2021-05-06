import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: async (configService: ConfigService) => {
                return {
                    uri: `${configService.get<string>('MONGO_URI')}/${configService.get<string>(
                        'DATABASE_NAME'
                    )}`,
                    useNewUrlParser: true,
                    useCreateIndex: true,
                    useUnifiedTopology: true,
                    useFindAndModify: false
                };
            },
            inject: [ConfigService]
        })
    ]
})
export class DatabaseModule {}
