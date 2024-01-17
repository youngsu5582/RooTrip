import { Test } from '@nestjs/testing';
import { ProfileStatus } from 'src/profile/domain/profile.domain';
import { ProfileCreateService } from 'src/profile/service/profile-create.service';
import { CreateProfileType } from 'src/profile/types/create-profile.type';
import { UserRepository } from 'src/user/repository/user.repository';
import { UserModule } from 'src/user/user.module';
import { UserFixture } from 'test/fixture/user.fixture';

describe('ProfileService',()=>{
        let profileCreateService : ProfileCreateService;
        let userRepository : UserRepository;
        const userDomain = UserFixture.getDomain(1);
        beforeEach(async ()=>{
            await userRepository.createUser(userDomain);
           });
           afterEach(async()=>{
            await userRepository.deleteUser(userDomain);
           });
       beforeAll(async () =>{
        const module = await Test.createTestingModule({
            imports:[UserModule]
           }).compile();
           userRepository= module.get(UserRepository);
           profileCreateService = module.get(ProfileCreateService);
       });
        it('CreateUserType 과 userId를 활용해 회원가입을 진행한다',async ()=>{
            const createUserType :CreateProfileType = {
                name : '이름',
                nickname : '닉네임'
            };

            const profileDomain = await profileCreateService.execute(createUserType,userDomain.user.id);
                        
            expect(profileDomain.status).toBe(ProfileStatus.REGISTER_SUCCESS);
        });
}); 