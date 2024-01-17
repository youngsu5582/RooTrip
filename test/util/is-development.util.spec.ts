
describe('is Development Util',()=>{
    it('ENV 의 NODE_MODE의 값이 없으면 true 를 반환한다.',()=>{
        const nodeMode = undefined;

        const result = nodeMode === undefined;

        expect(result).toBeTruthy();
    });
    test.each(['test','dev'])('ENV 의 NODE_MODE의 값이 test 이거나 dev 이면 true 를 반환한다.',(nodeMode:string)=>{

        const result = nodeMode === 'test' || nodeMode === 'dev';

        expect(result).toBeTruthy();
    });
    it('NODE_MODE 에 그 이외의 값이면 false 를 반환한다.',()=>{
        const nodeMode :string = 'prod';
        
        const result = (nodeMode === 'test' || nodeMode === 'dev') || nodeMode === undefined;

        expect(result).toBeFalsy();
    });
});