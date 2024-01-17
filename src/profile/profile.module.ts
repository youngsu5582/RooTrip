import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/lib/prisma/prisma.module';
import { ProfileCreateService } from './service/profile-create.service';
import { ProfileRepository } from 'src/user/repository/profile.repository';

@Module({
    imports: [PrismaModule],
    controllers : [],
    providers:[ProfileCreateService,ProfileRepository],
    exports : [ProfileCreateService]
})
export class ProfileModule {}
