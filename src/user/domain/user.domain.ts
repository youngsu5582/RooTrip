import { User } from '@prisma/client';
import { CreateUserType } from '../types/create-user.type';
import { hashString } from 'src/util/hash-string.util';
import { createSalt } from 'src/util/create-salt.util';

export enum UserStatus {
    'REGISTER_PREPARE',
    'REGISTER_SUCCESS',
    'REGISTER_FAILED',
    'USER_RETRIVED',
}
export class UserDomain {
    public readonly user: Readonly<User>;
    public status: UserStatus;

    private constructor(user: User, status: UserStatus) {
        this.user = user;
        this.status = status;
    }
    public static of({ email, password }: CreateUserType, id: string) {
        const salt = createSalt();
        const hashPassword = password ? hashString(password, salt) : null;
        const user: User = { email, password: hashPassword, salt, id, refreshToken: null };
        return new UserDomain(user, UserStatus.REGISTER_PREPARE);
    }

    public static from(user: User): UserDomain {
        return new UserDomain(user, UserStatus.USER_RETRIVED);
    }
}
