import { Test } from '@nestjs/testing';
import { UserDomain } from 'src/user/domain/user.domain';
import { UserRepository } from 'src/user/repository/user.repository';
import { UserModule } from 'src/user/user.module';
import { UserFixture } from 'test/fixture/user.fixture';

describe('UserRepository', () => {
    let userRepository: UserRepository;
    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [UserModule],
        }).compile();

        userRepository = module.get(UserRepository);
    });
    beforeEach(async () => {
        const userDomain = UserFixture.getDomain();
        await userRepository.createUser(userDomain);
    });
    afterEach(async () => {
        const userDomain = UserFixture.getDomain();
        await userRepository.deleteUser(userDomain);
    });
    it('UserDomain 을 통해 , DB 에 User 를 삽입후 True 를 반환한다.', async () => {
        const userDomain = UserFixture.getDomain(1);

        const result = await userRepository.createUser(userDomain);

        expect(result).toBeTruthy();
    });
    it('UserDomain 을 통해 , DB 에 User 를 삽입 실패할 시 False 를 반환한다.', async () => {
        const userDomain = UserFixture.getDomain(1);

        await userRepository.createUser(userDomain);
        const result = await userRepository.createUser(userDomain);

        expect(result).toBeFalsy();
    });

    it('email 을 통해 , DB 에서 Email 이 일치하는 UserDomain 을 받아온다.', async () => {
        const email = UserFixture.getDomain().user.email;

        const userDomain = await userRepository.findUserDomainByEmail(email);

        expect(() => userDomain.validEmail(email)).not.toThrow();
    });
    it('DB에서 Email이 일치하는 UserDomain 이 없는 경우 익명 유저를 받아온다.', async () => {
        const notExistedEmail = 'notExistedEmail@gmail.com';

        const userDomain = await userRepository.findUserDomainByEmail(notExistedEmail);

        expect(userDomain.user.email).toEqual(UserDomain.getAnonymousUser().user.email);
    });
    it('UserDomain 을 통해 , DB에 해당하는 User 에서 refreshToken Column 을 수정하고 True 를 반환한다.', async () => {
        const refreshToken = 'eyxuiuasn213';
        const userDomain = UserFixture.getDomain();

        const result = await userRepository.saveRefreshToken(userDomain, refreshToken);

        expect(result).toBeTruthy();
    });
});
