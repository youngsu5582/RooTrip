import { ConfigModule } from '@nestjs-library/config';
import { Test } from '@nestjs/testing';
import { TokenConfigService } from 'src/lib/config/token.config.service';
import { TokenDecoder } from 'src/lib/token/provider/token-decoder.provider';
import { TokenProcessor } from 'src/lib/token/provider/token-processor.provider';
import { TokenModule } from 'src/lib/token/token.module';
import typia from 'typia';

type TestingTokenType = {
    testingValue1: string;
    tesingValue2: number;
};

describe('Token Processor & Decoder Service', () => {
    let tokenProcessor: TokenProcessor<TestingTokenType>;
    let tokenDecoder: TokenDecoder<TestingTokenType>;
    let tokenConfigService: TokenConfigService;
    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [ConfigModule.forFeature([TokenConfigService]), TokenModule],
        }).compile();

        tokenConfigService = module.get(TokenConfigService);
        tokenProcessor = module.get(TokenProcessor);
        tokenDecoder = module.get(TokenDecoder);
    });
    it('액세스 토큰을 생성하고 , 다시 변환한다.', () => {
        const dummyData = typia.random<TestingTokenType>();

        const accessToken = tokenProcessor.generateAccessToken(dummyData);
        const decodePayload = tokenDecoder.decodeAccessToken(accessToken);

        expect(dummyData).toEqual(decodePayload.payload);
    });
    it('리프레쉬 토큰을 생성하고 , 다시 변환한다.', () => {
        const dummyData = typia.random<TestingTokenType>();

        const refreshToken = tokenProcessor.generateRefreshToken(dummyData);
        const decodePayload = tokenDecoder.decodeRefreshToken(refreshToken);

        expect(dummyData).toEqual(decodePayload.payload);
    });
    it('액세스 토큰의 유효기간은 ConfigService 의 값에 따른다', () => {
        const expireIn = tokenProcessor.getAccessTokenExpire();

        expect(expireIn).toEqual(tokenConfigService.accessTokenExpire);
    });
    it('액세스 토큰의 유효기간은 ConfigService 의 값에 따른다', () => {
        const expireIn = tokenProcessor.getRefreshTokenExpire();

        expect(expireIn).toEqual(tokenConfigService.accessTokenExpire);
    });
});
