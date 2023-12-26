import { Injectable } from '@nestjs/common';
import { AbstractConfigService } from '@nestjs-library/config';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

@Injectable()
export class OAuthConfigService extends AbstractConfigService<OAuthConfigService> {
    @Expose({ name: 'KAKAO_API_KEY' })
    @IsString()
    @IsNotEmpty()
    kakaoApiKey: string;
}
