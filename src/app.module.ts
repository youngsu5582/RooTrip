import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs-library/config';

import { SetnryConfigService } from './lib/config/sentry.config.service';
import { ServerConfigService } from './lib/config/server.config.service';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { TokenModule } from './lib/token/token.module';

@Module({
    imports: [ConfigModule.forFeature([SetnryConfigService, ServerConfigService]), UserModule, ProfileModule, TokenModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
