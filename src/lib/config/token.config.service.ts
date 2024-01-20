import { Injectable } from '@nestjs/common';
import { AbstractConfigService } from '@nestjs-library/config';
import { Expose, Transform } from 'class-transformer';
import { IsString, IsNumber } from 'class-validator';
import typia from 'typia';

type Unit = 'm' | 'h' | 'd' | 'y';
type UnitIndex = Unit | Uppercase<Unit>;

function transformExpire(expireString: string): number {
    if (typeof expireString !== 'string' || expireString.trim().length === 0) {
        return 900;
    }
    const unit = expireString.slice(-1);
    if (isUnitIndex(unit)) {
        const expire = Number.parseInt(expireString, 10);
        return parseExpire(unit, expire);
    }
    return 900;
}
function isUnitIndex(unit: string): unit is UnitIndex {
    return typia.random<UnitIndex>().includes(unit);
}
function parseExpire(unit: UnitIndex, expire: number): number {
    if (unit == 'm' || unit == 'M') {
        return expire * 60;
    }
    if (unit == 'H' || unit == 'h') {
        return expire * 60 * 60;
    }
    if (unit == 'D' || unit == 'd') {
        return 60 * 60 * 24;
    }
    if (unit == 'Y' || unit == 'y') {
        return expire * 60 * 60 * 24 * 30 * 12;
    }
    return 900;
}
@Injectable()
export class TokenConfigService extends AbstractConfigService<TokenConfigService> {
    @Expose({ name: 'ACCESS_SECRET_KEY' })
    @Transform(({ value }) => value ?? 'accessSecretKey1#cxa')
    @IsString()
    accessSecretKey: string;

    @Expose({ name: 'REFRESH_SECRET_KEY' })
    @Transform(({ value }) => value ?? 'refreshSecretKey1#cxa')
    @IsString()
    refreshSecretKey: string;

    @Expose({ name: 'ACCESS_TOKEN_EXPIRE' })
    @Transform(({ value }) => transformExpire(value) ?? transformExpire('15m'))
    @IsNumber()
    accessTokenExpire: number;

    @Expose({ name: 'REFRESH_TOKEN_EXPIRE' })
    @Transform(({ value }) => transformExpire(value) ?? transformExpire('1d'))
    @IsNumber()
    refreshTokenExpire: number;
}
