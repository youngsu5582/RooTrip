import { Test } from '@nestjs/testing';
import { LocalLoginController } from 'src/user/controller/local-login.controller';
import { LocalLoginResponseDto } from 'src/user/dto/response/local-login.response.dto';
import { LocalRegisterService } from 'src/user/service/local-register.service';
import { UserModule } from 'src/user/user.module';
import { 유저_생성 } from './step/유저 생성';
import { LocalLoginRequestDto } from 'src/user/dto/request/local-login.request.dto';
import typia from 'typia';

describe('LocalLoginController', () => {
    let localLoginController: LocalLoginController;
    let localRegisterService: LocalRegisterService;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports: [UserModule],
        }).compile();
        localRegisterService = module.get(LocalRegisterService);
        localLoginController = module.get(LocalLoginController);
    });
    it('LocalLoginRequest Dto 를 통해 , 로그인을 진행 후 , LocalLoginResponse Dto 를 받는다.', async () => {
        const userPassword = typia.random<string>();
        const userDomain = await 유저_생성(localRegisterService, userPassword);

        const localLoginRequestDto: LocalLoginRequestDto = {
            email: userDomain.user.email,
            password: userPassword,
        };

        const result = await localLoginController.execute(localLoginRequestDto);

        expect(result).toBeInstanceOf(LocalLoginResponseDto);
    });
});
