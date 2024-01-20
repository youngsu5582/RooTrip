import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs-library/config';
import { OAuthConfigService } from 'src/lib/config/o-auth.config.service';
import { LocalRegisterController } from './controller/local-register.controller';
import { LocalRegisterService } from './service/local-register.service';
import { UserRepository } from './repository/user.repository';
import { ProfileModule } from 'src/profile/profile.module';
import { LocalLoginService } from './service/local-login.service';
import { LocalLoginController } from './controller/local-login.controller';
import { TokenModule } from 'src/lib/token/token.module';

@Module({
    imports: [ConfigModule.forFeature(OAuthConfigService), TokenModule, ProfileModule],
    controllers: [LocalRegisterController, LocalLoginController],
    providers: [LocalRegisterService, UserRepository, LocalLoginService],
})
export class UserModule {}
