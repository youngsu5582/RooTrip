import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma/prisma.provider';
import { UserDomain, UserStatus } from '../domain/user.domain';
import { Prisma } from 'prisma/prisma-client';

@Injectable()
export class UserRepository {
    constructor(private readonly prismaService : PrismaService){}

    public async createUser(userDomain : UserDomain) : Promise<boolean>{
        try {
            await this.prismaService.user.create({
                data: userDomain.user
            });
            userDomain.status = UserStatus.REGISTER_SUCCESS;
            return true;
        } catch (error) {
            if ( error instanceof Prisma.PrismaClientKnownRequestError){
                userDomain.status = UserStatus.REGISTER_FAILED;
                return false;
            }
            throw error;
        }
    }
}