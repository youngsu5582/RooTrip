import {User} from 'prisma/prisma-client';

export type CreateUserType = Pick<User,'email'|'password'>;