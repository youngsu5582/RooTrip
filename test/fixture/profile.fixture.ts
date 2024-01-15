import { Profile } from 'prisma/prisma-client';
import typia from 'typia';

export class ProfileFixture{
    public static create() : Profile{
        const profile:Profile = typia.random<Profile>();
        return profile;
    }
}