import { Test } from '@nestjs/testing';
import { UserStatus } from 'src/user/domain/user.domain';
import { LocalRegisterService } from 'src/user/service/local-register.service';
import { CreateUserType } from 'src/user/types/create-user.type';
import { UserModule } from 'src/user/user.module';
import { randomId } from 'src/util/random-id.util';

describe('LocalRegisterService',()=>{
        let localRegisterService : LocalRegisterService;
       beforeEach(async () =>{
        const module = await Test.createTestingModule({
            imports:[UserModule]
           }).compile();
    
        localRegisterService = module.get(LocalRegisterService);
       });
        it('CreateUserType 과 userId를 활용해 회원가입을 진행한다',async ()=>{
            const createUserType :CreateUserType = {
                email : 'test@gmail.com',
                password : 'Password1234!'
            };
            const userId = randomId();

            const userDomain = await localRegisterService.execute(createUserType,userId);
            
            expect(userDomain.status).toBe(UserStatus.REGISTER_SUCCESS);
        });
}); 