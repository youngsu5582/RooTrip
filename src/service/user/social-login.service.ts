import { userInfo } from "os";
import { SocialLoginDto } from "src/dto/request/SocialLoginDto";
import { LoginStragety } from "src/provider/LoginStragety";
import { KakaoLoginStragety } from "src/provider/user/KakaoLoginStragety";
import { SocialLoginType } from "src/types";

export class SocialLoginService{
    constructor(){}
    async execute(socialLoginDto:SocialLoginDto){

        const {code,provider} = socialLoginDto;
        const loginStragety:LoginStragety|null=this.setStragety(provider);
        if(loginStragety){
            const acessToken = await loginStragety.getAccessToken(code);
            const userInfo = await loginStragety.getUserInfo(acessToken);
            return userInfo;
        }
        
    }
    private setStragety(provider:SocialLoginType) : LoginStragety|null{
        if(provider==="kakao")
            return new KakaoLoginStragety();
        return null;
    }
}

