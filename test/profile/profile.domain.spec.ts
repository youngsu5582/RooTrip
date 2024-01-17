import { ProfileFixture } from 'test/fixture/profile.fixture';
import { ProfileDomain } from 'src/profile/domain/profile.domain';

describe('User Domain',()=>{
    it('이름 과 닉네임을 가지고 , ProfileDomain 을 만든다.',()=>{
        const name = '영수';
        const nickname = '이영슈';
        const userId = 'userId12sczx';

        const profileDomain = ProfileDomain.of({name,nickname},userId);

        expect(profileDomain).toBeInstanceOf(ProfileDomain);
    });
    it('DB 에서 받은 Profile 을 통해서 , ProfileDomain 을 만든다.',()=>{
        const profile = ProfileFixture.get();

        const profileDomain = ProfileDomain.from(profile);

        expect(profileDomain).toBeInstanceOf(ProfileDomain);
    });
});