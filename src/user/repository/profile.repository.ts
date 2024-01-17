import { Injectable } from '@nestjs/common';
import { Prisma } from 'prisma/prisma-client';
import { PrismaService } from 'src/lib/prisma/prisma.provider';
import { ProfileDomain, ProfileStatus } from 'src/profile/domain/profile.domain';

@Injectable()
export class ProfileRepository {
    constructor(private readonly prismaService : PrismaService){}

    public async createProfile(profileDomain : ProfileDomain){
        try {
            await this.prismaService.profile.create({
                data: profileDomain.profile
            });
            profileDomain.status = ProfileStatus.REGISTER_SUCCESS;
            return true;
        } catch (error) {
            if ( error instanceof Prisma.PrismaClientKnownRequestError){
                profileDomain.status = ProfileStatus.REGISTER_FAILED;
                return false;
            }
            throw error;
        }
    }
}