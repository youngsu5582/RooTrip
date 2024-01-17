import { Profile } from 'prisma/prisma-client';
import typia from 'typia';
import { UserFixture } from './user.fixture';
import { ProfileDomain } from 'src/profile/domain/profile.domain';

export class ProfileFixture {
    public static get(): Profile {
        const profile: Profile = typia.random<Profile>();
        return profile;
    }
    public static getWithFixUserId(): Profile {
        const profile = typia.random<Profile>();
        profile.userId = UserFixture.get().id;
        return profile;
    }
    public static getDomainWithFixUserId(): ProfileDomain {
        const userId = UserFixture.getDomain().user.id;
        const profile = typia.random<Profile>();
        return ProfileDomain.of(profile, userId);
    }
}
