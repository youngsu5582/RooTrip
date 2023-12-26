import { Injectable } from '@nestjs/common';
import { AbstractConfigService } from '@nestjs-library/config';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

@Injectable()
export class SetnryConfigService extends AbstractConfigService<SetnryConfigService> {
    @Expose({ name: 'SENTRY_DSN' })
    @IsString()
    @IsNotEmpty()
    dsn: string;
}
