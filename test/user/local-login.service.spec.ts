import { Test } from '@nestjs/testing';
import { LocalLoginRequestDto } from 'src/user/dto/request/local-login.request.dto';
import { LocalLoginService } from 'src/user/service/local-login.service';
import { UserModule } from 'src/user/user.module';
import { 유저_생성 } from './step/유저 생성';
import { LocalRegisterService } from 'src/user/service/local-register.service';
import { LoginTokenInfoType } from 'src/user/types';

describe('LocalLoginService', () => {
    let localLoginService: LocalLoginService;
    let localRegisterService: LocalRegisterService;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports: [UserModule],
        }).compile();

        localRegisterService = module.get(LocalRegisterService);
        localLoginService = module.get(LocalLoginService);
    });
    it('localLoginRequestDto 을 통해 로그인 로직을 진행 후 , loginTokenInfo 를 반환한다', async () => {
        const password = 'randomPassword';
        const userDomain = await 유저_생성(localRegisterService, password);

        const localLoginRequestDto: LocalLoginRequestDto = {
            email: userDomain.user.email,
            password: password,
        };

        const result: LoginTokenInfoType = await localLoginService.execute(localLoginRequestDto);

        expect(result.accessToken).toBeDefined();
        expect(result.refreshToken).toBeDefined();
    });
});
