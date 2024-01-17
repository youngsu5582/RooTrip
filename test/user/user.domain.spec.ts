import { UserDomain } from 'src/user/domain/user.domain';
import { randomId } from 'src/util/random-id.util';
import { UserFixture } from '../fixture/user.fixture';
import { CreateUserType } from 'src/user/types/create-user.type';
import typia from 'typia';

describe('User Domain', () => {
    it('이메일,비밀번호,Id 를 가지고 , UserDomain 을 만든다.', () => {
        const createUserType: CreateUserType = typia.random<CreateUserType>();
        const id = randomId();

        const userDomain = UserDomain.of(createUserType, id);

        expect(userDomain).toBeInstanceOf(UserDomain);
    });
    it('DB 에서 받은 User 를 통해서 , UserDomain 을 만든다.', () => {
        const user = UserFixture.get();

        const userDomain = UserDomain.from(user);

        expect(userDomain).toBeInstanceOf(UserDomain);
    });
});
