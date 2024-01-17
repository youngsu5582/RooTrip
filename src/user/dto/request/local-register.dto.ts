import { CreateProfileType } from 'src/profile/types/create-profile.type';
import { CreateUserType } from 'src/user/types/create-user.type';

export type LocalRegisterRequestDto = CreateUserType & CreateProfileType;