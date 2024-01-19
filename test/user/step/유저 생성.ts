import { LocalRegisterService } from 'src/user/service/local-register.service';
import { CreateUserType } from 'src/user/types';
import { randomId } from 'src/util/random-id.util';
import typia from 'typia';

export async function 유저_생성(localRegisterService: LocalRegisterService, password: string) {
    const createUserType = typia.random<CreateUserType>();
    createUserType.password = password;
    const userId = randomId();
    return await localRegisterService.execute(createUserType, userId);
}
