import { randomBytes } from 'crypto';

describe('Create Salt Util',()=>{
    it('무작위의 16글자의 솔트 값을 생성한다.',()=>{
        const size = 16;

        const salt = randomBytes(size).toString('hex');

        expect(salt.length).toBe(32);
    });
});