import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService, MongooseHealthIndicator } from '@nestjs/terminus';

@ApiTags('Health Check')
@Controller('health')
export class HealthController {
    constructor(
        private health: HealthCheckService,
        private readonly mongoose: MongooseHealthIndicator
    ) {}

    @Get()
    @HealthCheck()
    @ApiOperation({
        summary: 'Runs a set of health-checks on the application (database connection, etc).'
    })
    async check() {
        // return this.health.check([() => this.mongoose.pingCheck('mongo')]);
        const { status } = await this.health.check([() => this.mongoose.pingCheck('mongo')]);
        return { status };
    }
}
