import { Profile } from 'prisma/prisma-client';

export type CreateProfileType = Pick<Profile, 'name' | 'nickname'>;
