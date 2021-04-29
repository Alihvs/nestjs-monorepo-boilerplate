import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { TransformInterceptor } from '@shared/pipe/pipe.global-interceptor';
import * as helmet from 'helmet';
import * as Swagger from 'swagger-ui-express';
import { AppModule } from './app.module';
import * as chalk from 'chalk';
import version from '@shared/utils/version';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = await app.get<ConfigService>(ConfigService);
    const port = configService.get<number>('API_PORT', 3002);
    const host = configService.get<string>('HOST', 'localhost');

    // app.useGlobalInterceptors(new TransformInterceptor());
    app.use(helmet());
    app.enableCors();

    const options = new DocumentBuilder()
        .setTitle('API Documentation')
        .setDescription(
            'The Public API. This microservice will be exposed on the internet to be consumed by the frontend.'
        )
        .setVersion(version)
        .addBearerAuth({ type: 'http', in: 'header', scheme: 'Bearer' }, 'access_token')
        .build();

    const document = SwaggerModule.createDocument(app, options);

    app.use(
        '/swagger',
        Swagger.serve,
        Swagger.setup(document, {
            swaggerOptions: {
                persistAuthorization: true
            }
        })
    );

    SwaggerModule.setup('swagger', app, document);

    await app.listen(port, host);
    const url = await app.getUrl();

    console.log(`
        Status:   ${chalk.blueBright('Running')}
        Version:  ${chalk.blueBright(version)}
        Address:  ${chalk.green(url)}
        Docs:     ${chalk.green(`${url}/swagger`)}
    `);
}

bootstrap();
