import { Injectable } from '@nestjs/common';
import { TokenConfigService } from 'src/lib/config/token.config.service';
import { JwtService } from '@nestjs/jwt';
import { CustomJwtPayload } from '../types';

@Injectable()
export class TokenDecoder<T> {
    constructor(private readonly tokenConfigService: TokenConfigService, private readonly jwtService: JwtService) {}
    public decodeAccessToken(payload: string): CustomJwtPayload<T> {
        return this.jwtService.verify(payload, {
            secret: this.tokenConfigService.accessSecretKey,
        });
    }
    public decodeRefreshToken(payload: string): CustomJwtPayload<T> {
        return this.jwtService.verify(payload, {
            secret: this.tokenConfigService.refreshSecretKey,
        });
    }
}
