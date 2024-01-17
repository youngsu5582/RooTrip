import { pbkdf2Sync, randomBytes } from 'crypto';
import { createSalt } from 'src/util/create-salt.util';

describe('Hash String Util', () => {
    let salt = createSalt();
    it('문자열을 암호화 한다.', () => {
        const plainText = 'password1234';

        const salt = randomBytes(16).toString('hex');
        const hashText = pbkdf2Sync(plainText, salt, 100, 16, 'sha256').toString('hex');

        expect(hashText).not.toBe(plainText);
    });
    it('똑같은 문자열 과 똑같은 솔트로 암호화 하면 똑같은 값이 나온다,', () => {
        const plainText = 'password1234';

        const hashText1 = pbkdf2Sync(plainText, salt, 100, 16, 'sha256').toString('hex');
        const hashText2 = pbkdf2Sync(plainText, salt, 100, 16, 'sha256').toString('hex');

        expect(hashText1).toBe(hashText2);
    });
});
