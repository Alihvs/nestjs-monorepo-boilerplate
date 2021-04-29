import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ConfigurationService } from '../configuration/configuration.service';

@ApiTags('API: Configuration')
@Controller()
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
