import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs-library/config';
import { OAuthConfigService } from 'src/lib/config/o-auth.config.service';
import { PrismaModule } from 'src/lib/prisma/prisma.module';
import { LocalRegisterController } from './controller/local-register.controller';
import { LocalRegisterService } from './service/local-register.service';
import { UserRepository } from './repository/user.repository';
import { ProfileModule } from 'src/profile/profile.module';

@Module({
    imports: [ConfigModule.forFeature(OAuthConfigService), PrismaModule, ProfileModule],
    controllers: [LocalRegisterController],
    providers: [LocalRegisterService, UserRepository],
})
export class UserModule {}
