import { User } from '@prisma/client/edge';
export type LocalLoginDto = Pick<User, 'email' | 'password'>;
