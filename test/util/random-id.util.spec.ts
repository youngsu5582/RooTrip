import { randomUUID } from 'crypto';

describe('Random Id Util',()=>{
    it('무작위 UUID 를 생성한다.',()=>{
        const id = randomUUID();
        
        const uuidRegex = /^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i;
        expect(id).toMatch(uuidRegex);
    });
}); 