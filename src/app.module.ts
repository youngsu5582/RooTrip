import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs-library/config';

import { SetnryConfigService } from './lib/config/sentry.config.service';
import { ServerConfigService } from './lib/config/server.config.service';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { TokenModule } from './lib/token/token.module';

const module = [UserModule, ProfileModule, TokenModule];

@Module({
    imports: [ConfigModule.forFeature([SetnryConfigService, ServerConfigService]), ...module],
    controllers: [],
    providers: [],
})
export class AppModule {}
