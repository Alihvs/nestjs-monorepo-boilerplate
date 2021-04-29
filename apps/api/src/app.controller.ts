import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('Root Ping')
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @ApiOperation({
        summary: 'Pings the application and returns a status code of 200.'
    })
    pingRoot(): any {
        return this.appService.pingRoot();
    }
}
