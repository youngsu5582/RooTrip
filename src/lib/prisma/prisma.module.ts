import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.provider';
import { ConfigModule } from '@nestjs-library/config';
import { DatabaseConfigService } from '../config/database.config.service';

@Global()
@Module({
    imports: [ConfigModule.forFeature([DatabaseConfigService])],
    providers: [PrismaService],
    exports: [PrismaService],
})
export class PrismaModule {}
