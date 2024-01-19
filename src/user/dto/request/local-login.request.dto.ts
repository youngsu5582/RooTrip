import { User } from '@prisma/client/edge';
export type LocalLoginRequestDto = {
    email: string;
    password: NonNullable<User['password']>;
};
