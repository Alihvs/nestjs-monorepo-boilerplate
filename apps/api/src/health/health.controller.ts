import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService, MongooseHealthIndicator } from '@nestjs/terminus';
import { SentryInterceptor } from '@shared/sentry/sentry.interceptor';

@ApiTags('Health Check')
@Controller('health')
@UseInterceptors(SentryInterceptor)
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
