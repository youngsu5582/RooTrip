import { isDevelopment } from 'src/util/is-development.util';

describe('is Development Util', () => {
    test.each(['test', 'dev'])('ENV 의 NODE_MODE의 값이 test 이거나 dev 이면 true 를 반환한다.', (nodeMode: string) => {
        const result = isDevelopment(nodeMode);

        expect(result).toBeTruthy();
    });
    it('NODE_MODE 에 그 이외의 값이면 false 를 반환한다.', () => {
        const nodeMode: string = 'prod';

        const result = isDevelopment(nodeMode);

        expect(result).toBeFalsy();
    });
    it('ENV 의 NODE_MODE의 값이 있으면 해당 값에 맞는 결과를 반환한다.', () => {
        const result = isDevelopment();

        expect(result).toBeTruthy();
    });
});
