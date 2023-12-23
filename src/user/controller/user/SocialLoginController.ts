import { TypedBody } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { SocialLoginDto } from "src/user/dto/request/SocialLoginDto";
import { SocialLoginService } from "src/user/service/user/SocialLoginService";

Controller("")
export class SocialLoginController{
    constructor(private readonly socialLoginService:SocialLoginService){}
    async socialLogin(@TypedBody() socialLoginDto:SocialLoginDto){
        const userInfo = this.socialLoginService.execute(socialLoginDto);
    }
}