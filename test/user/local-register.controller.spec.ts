import { Test } from '@nestjs/testing';
import { LocalRegisterController } from 'src/user/controller/local-register.controller';
import { LocalRegisterRequestDto } from 'src/user/dto/request/local-register.dto';
import { LocalRegisterResponseDto } from 'src/user/dto/response/local-register.response.dto';
import { UserModule } from 'src/user/user.module';
import typia from 'typia';

describe('LocalRegisterController', () => {
    let localRegisterController: LocalRegisterController;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports: [UserModule],
        }).compile();

        localRegisterController = module.get(LocalRegisterController);
    });
    it('LocalRegisterRequest Dto 를 통해 , 회원가입을 진행 후 , LocalReigsterResponse Dto 를 받는다.', async () => {
        const dto: LocalRegisterRequestDto = typia.random<LocalRegisterRequestDto>();

        const result = await localRegisterController.execute(dto);

        expect(result).toBeInstanceOf(LocalRegisterResponseDto);
    });
});
