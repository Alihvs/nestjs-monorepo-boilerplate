import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigurationService {
    // constructor() {}

    async getCurrentConfig(): Promise<any> {
        const config = {
            status: 'running',
            enabled: true
        };

        return config;
    }
}
