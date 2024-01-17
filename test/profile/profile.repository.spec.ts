import { Test } from '@nestjs/testing';
import { ProfileDomain } from 'src/profile/domain/profile.domain';
import { ProfileModule } from 'src/profile/profile.module';
import { ProfileRepository } from 'src/user/repository/profile.repository';
import { UserRepository } from 'src/user/repository/user.repository';
import { UserModule } from 'src/user/user.module';
import { UserFixture } from 'test/fixture/user.fixture';

describe('ProfileRepository', () => {
    let profileRepository: ProfileRepository;
    let userRepository: UserRepository;
    const userDomain = UserFixture.getDomain();

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [ProfileModule, UserModule],
            providers: [],
        }).compile();
        userRepository = module.get(UserRepository);
        profileRepository = module.get(ProfileRepository);
    });
    beforeEach(async () => {
        await userRepository.createUser(userDomain);
    });
    afterEach(async () => {
        await userRepository.deleteUser(userDomain);
    });
    it('ProfileDomain 을 통해 , DB 에 Profile 을 삽입후 True 를 반환한다.', async () => {
        const profileDomain = ProfileDomain.of({ name: '영수', nickname: '영슈' }, userDomain.user.id);

        const result = await profileRepository.createProfile(profileDomain);

        expect(result).toBeTruthy();
    });
});
