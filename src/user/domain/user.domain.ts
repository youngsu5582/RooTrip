import { User } from '@prisma/client';
import { CreateUserType } from '../types/create-user.type';
import { hashString } from 'src/util/hash-string.util';
import { createSalt } from 'src/util/create-salt.util';
import { TokenPayloadType } from '../types/create-refresh-token.type';
import typia from 'typia';
import { InvalidEmailError, InvalidPasswordError } from '../error';

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
    public static getAnonymousUser() {
        return new UserDomain(typia.random<User>(), UserStatus.USER_RETRIVED);
    }
    public validPassword(password: string) {
        console.log(this.user.password);
        console.log(hashString(password, this.user.salt!));

        if (this.user.password !== hashString(password, this.user.salt!)) {
            throw new InvalidPasswordError();
        }
    }
    public validEmail(email: string) {
        if (this.user.email !== email) {
            throw new InvalidEmailError();
        }
    }
    public getTokenPayload(): TokenPayloadType {
        return {
            id: this.user.id,
            email: this.user.email,
        };
    }
}
