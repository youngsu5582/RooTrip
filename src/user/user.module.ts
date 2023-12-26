import { Module } from '@nestjs/common';
// import { SocialLoginController } from "./controller/user/SocialLoginController";
// import { KakaoLoginStragety } from "./provider/stragety/KakaoLoginStragety";
import { ConfigModule } from '@nestjs-library/config';
import { OauthConfigService } from 'src/lib/config/o-auth.config.service';

@Module({
    imports: [ConfigModule.forFeature(OauthConfigService)],
    // controllers : [SocialLoginController],
    // providers:[KakaoLoginStragety,KakaoLoginStragety]
})
export class UserModule {}
