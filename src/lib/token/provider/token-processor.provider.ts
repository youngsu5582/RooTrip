import { Injectable } from '@nestjs/common';
import { TokenConfigService } from 'src/lib/config/token.config.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenProcessor<T extends Record<string, any>> {
    constructor(private readonly tokenConfigService: TokenConfigService, private readonly jwtService: JwtService) {}
    public getAccessTokenExpire() {
        return this.tokenConfigService.accessTokenExpire;
    }
    public getRefreshTokenExpire(){
        return this.tokenConfigService.refreshTokenExpire;
    }
    public generateAccessToken(payload: T): string {
        return this.jwtService.sign(
            { payload },
            {
                secret: this.tokenConfigService.accessSecretKey,
                expiresIn: this.tokenConfigService.accessTokenExpire,
            },
        );
    }
    public generateRefreshToken(payload: T): string {
        return this.jwtService.sign(
            { payload },
            {
                secret: this.tokenConfigService.refreshSecretKey,
                expiresIn: this.tokenConfigService.refreshTokenExpire,
            },
        );
    }
}
