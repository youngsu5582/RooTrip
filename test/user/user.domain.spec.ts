import { UserDomain } from 'src/user/domain/user.domain';
import { randomId } from 'src/util/random-id.util';
import { UserFixture } from '../fixture/user.fixture';
import { CreateUserType } from 'src/user/types/create-user.type';
import typia from 'typia';
import { InvalidEmailError, InvalidPasswordError } from 'src/user/error';
import { TokenPayloadType } from 'src/user/types/create-refresh-token.type';

describe('User Domain', () => {
    //======================================================================================================
    // Static Method
    //======================================================================================================
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
    it('랜덤 User 를 통한 UserDomain 을 만든다.', () => {
        const userDomain = UserDomain.getAnonymousUser();

        expect(userDomain).toBeInstanceOf(UserDomain);
    });
    // =======================================================================================
    // Domain Methods
    // =======================================================================================

    it('이메일이 똑같은지 검증한다.', () => {
        const userDomain = UserFixture.getDomain();
        const email = userDomain.user.email;

        expect(() => userDomain.validEmail(email)).not.toThrow();
    });

    it('이메일이 다를 경우 에러를 던진다.', () => {
        const userDomain = UserFixture.getDomain();
        const invalidEmail = 'invalid@example.com';

        expect(() => userDomain.validEmail(invalidEmail)).toThrow(InvalidEmailError);
    });

    it('비밀번호가 똑같은지 검증한다.', () => {
        const user = UserFixture.get();
        const id = randomId();
        const userDomain = UserDomain.of(user, id);

        expect(() => userDomain.validPassword(user.password!)).not.toThrow();
    });

    it('비밀번호가 다를 경우 에러를 던진다.', () => {
        const userDomain = UserFixture.getDomain();
        const invalidPassword = 'invalidPassword!';

        expect(() => userDomain.validPassword(invalidPassword)).toThrow(InvalidPasswordError);
    });
    it('토큰 생성을 위한 페이로드를 반환한다', () => {
        const userDomain = UserFixture.getDomain();

        const paylaod: TokenPayloadType = userDomain.getTokenPayload();

        expect(paylaod.email).toEqual(userDomain.user.email);
        expect(paylaod.id).toEqual(userDomain.user.id);
    });
});
