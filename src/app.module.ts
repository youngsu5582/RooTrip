import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs-library/config';

import { SetnryConfigService } from './lib/config/sentry.config.service';
import { ServerConfigService } from './lib/config/server.config.service';

@Module({
    imports: [ConfigModule.forFeature([SetnryConfigService, ServerConfigService])],
    controllers: [],
    providers: [],
})
export class AppModule {}
