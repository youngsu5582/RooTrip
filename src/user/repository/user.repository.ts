import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma/prisma.provider';
import { UserDomain, UserStatus } from '../domain/user.domain';
import { Prisma } from 'prisma/prisma-client';

@Injectable()
export class UserRepository {
    constructor(private readonly prismaService: PrismaService) {}

    public async createUser(userDomain: UserDomain): Promise<boolean> {
        try {
            await this.prismaService.user.create({
                data: userDomain.user,
            });
            userDomain.status = UserStatus.REGISTER_SUCCESS;
            return true;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                userDomain.status = UserStatus.REGISTER_FAILED;
                return false;
            }
            throw error;
        }
    }
    public async findUserDomainByEmail(email: string): Promise<UserDomain> {
        const user = await this.prismaService.user.findFirst({
            where: {
                email,
            },
        });
        if (user) {
            return UserDomain.from(user);
        }
        return UserDomain.getAnonymousUser();
    }
    public async deleteUser(userDomain: UserDomain): Promise<boolean> {
        try {
            await this.prismaService.user.delete({
                where: userDomain.user,
            });
            return true;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return false;
            }
            throw error;
        }
    }
    public async saveRefreshToken(userDomain: UserDomain, refreshToken: string) {
        try {
            await this.prismaService.user.update({
                where: {
                    id: userDomain.user.id,
                },
                data: {
                    refreshToken,
                },
            });
            return true;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return false;
            }
            throw error;
        }
    }
}
