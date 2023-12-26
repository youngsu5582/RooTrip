import { SocialLoginDto } from 'src/user/dto/request/social-login.dto';
import { KakaoLoginStragety } from 'src/user/provider/stragety/kakao-login.stragety';
import { SocialLoginStragety } from 'src/user/provider/stragety/login.stragety';
import { SocialLoginType } from 'src/user/types';

export class SocialLoginService {
    async execute(socialLoginDto: SocialLoginDto) {
        const { code, provider } = socialLoginDto;
        const loginStragety: SocialLoginStragety | null = this.setStragety(provider);
        if (loginStragety) {
            const acessToken = await loginStragety.getAuthenticate(code);
            const userInfo = await loginStragety.getUserInfo(acessToken);
            return userInfo;
        }
    }
    private setStragety(provider: SocialLoginType): SocialLoginStragety | null {
        if (provider === 'kakao') return new KakaoLoginStragety();
        return null;
    }
}
