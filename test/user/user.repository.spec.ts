import {Test} from '@nestjs/testing';
import { UserDomain } from 'src/user/domain/user.domain';
import { UserRepository } from 'src/user/repository/user.repository';
import { UserModule } from 'src/user/user.module';
import typia from 'typia';

describe('UserRepository',()=>{
    let userRepository : UserRepository;
   beforeEach(async () =>{
    const module = await Test.createTestingModule({
        imports:[UserModule],
    
       }).compile();
    
    userRepository = module.get(UserRepository);
   });
    it('UserDomain 을 통해 , DB 에 User 를 삽입후 True 를 반환한다.',async ()=>{
        const userDomain = typia.random<UserDomain>();
        const result = await userRepository.createUser(userDomain);
        
        expect(result).toBeTruthy();
    });
}); 