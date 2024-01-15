import { UserDomain } from 'src/user/domain/user.domain';
import { randomId } from 'src/util/random-id.util';
import { UserFixture } from '../fixture/user.fixture';

describe('User Domain',()=>{
    it('이메일,비밀번호,Id 를 가지고 , UserDomain 을 만든다.',()=>{
        const email = 'i894@naver.com';
        const password = 'password1234';
        const id = randomId();

        const userDomain = UserDomain.of({email,password},id);

        expect(userDomain).toBeInstanceOf(UserDomain);
    });
    it('DB 에서 받은 User 를 통해서 , UserDomain 을 만든다.',()=>{
        const user = UserFixture.create();

        const userDomain = UserDomain.from(user);

        expect(userDomain).toBeInstanceOf(UserDomain);
    });
});