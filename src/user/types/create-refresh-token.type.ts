import { User } from 'prisma/prisma-client';

export type TokenPayloadType = Pick<User, 'id' | 'email'>;
