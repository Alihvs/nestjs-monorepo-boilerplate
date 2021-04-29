import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SentryInterceptor } from '@shared/sentry/sentry.interceptor';
import { ConfigurationService } from './configuration.service';

@ApiTags('Configuration')
@Controller()
@UseInterceptors(SentryInterceptor)
export class ConfigurationController {
    constructor(private readonly configurationService: ConfigurationService) {}

    @Get('/api/v1/configuration')
    @ApiOperation({
        summary: 'Returns the general configuration of the app.'
    })
    async getAllSystemVariables() {
        return this.configurationService.getCurrentConfig();
    }
}
