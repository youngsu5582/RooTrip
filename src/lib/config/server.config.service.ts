import { Injectable } from '@nestjs/common';
import { AbstractConfigService } from '@nestjs-library/config';
import { Expose, Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

@Injectable()
export class ServerConfigService extends AbstractConfigService<ServerConfigService> {
    @Expose({ name: 'API_PORT' })
    @Transform(({ value }) => Number.parseInt(value, 10) ?? 37_001)
    @IsNumber()
    port: number;

    @Expose({ name: 'NODE_MODE' })
    @Transform(({ value }) => value ?? 'local')
    @IsString()
    development: string;
}
