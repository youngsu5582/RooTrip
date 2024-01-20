import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs-library/config';
import { TokenConfigService } from '../config/token.config.service';
import { TokenProcessor } from './provider/token-processor.provider';
import { TokenDecoder } from './provider/token-decoder.provider';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [ConfigModule.forFeature([TokenConfigService])],
    providers: [TokenProcessor, TokenDecoder, JwtService],
    exports: [TokenProcessor, TokenDecoder],
})
export class TokenModule {}
