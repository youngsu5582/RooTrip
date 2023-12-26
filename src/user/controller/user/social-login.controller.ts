import { TypedBody } from '@nestia/core';
import { Controller } from '@nestjs/common';
import { SocialLoginDto } from 'src/user/dto/request/social-login.dto';
import { SocialLoginService } from 'src/user/service/social-login.service';

Controller('');
export class SocialLoginController {
    constructor(private readonly socialLoginService: SocialLoginService) {}
    async socialLogin(@TypedBody() socialLoginDto: SocialLoginDto) {
        await this.socialLoginService.execute(socialLoginDto);
    }
}
