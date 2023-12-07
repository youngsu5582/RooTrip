import { TypedBody } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { SocialLoginDto } from "src/dto/request/SocialLoginDto";
import { SocialLoginService } from "src/service/user/social-login.service";

Controller("")
export class SocialLoginController{
    constructor(private readonly socialLoginService:SocialLoginService){}
    async socialLogin(@TypedBody() socialLoginDto:SocialLoginDto){
        const userInfo = this.socialLoginService.execute(socialLoginDto);
    }
}