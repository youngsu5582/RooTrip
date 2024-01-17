import { Injectable } from '@nestjs/common';
import { AbstractConfigService } from '@nestjs-library/config';
import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

@Injectable()
export class DatabaseConfigService extends AbstractConfigService<DatabaseConfigService> {
    @Expose({ name: 'DATABASE_HOST' })
    @IsString()
    @IsNotEmpty()
    databaseHost: string;

    @Expose({ name: 'DATABASE_PORT' })
    @Transform(({ value }) => Number.parseInt(value, 10) ?? 5432)
    @IsNumber()
    databasePort: number;

    @Expose({ name: 'DATABASE_NAME' })
    @IsString()
    @IsNotEmpty()
    databaseName: string;

    @Expose({ name: 'DATABASE_USERNAME' })
    @IsString()
    @IsNotEmpty()
    databaseUsername: string;

    @Expose({ name: 'DATABASE_PASSWORD' })
    @IsString()
    @IsNotEmpty()
    databasePassword: string;

    // @Expose({ name: 'DATABASE_URL' })
    // @IsString()
    // @IsNotEmpty()
    // databaseUrl: string;

    public getDatabaseUrl(){
        return `postgresql://${this.databaseUsername}:${this.databasePassword}@${this.databaseHost}:${this.databasePort}/${this.databaseName}`;
    }
}

