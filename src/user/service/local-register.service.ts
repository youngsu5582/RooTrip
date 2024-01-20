import { Inject, Injectable } from '@nestjs/common';
import { UserDomain } from '../domain/user.domain';
import { UserRepository } from '../repository/user.repository';
import { CreateUserType } from '../types/create-user.type';

@Injectable()
export class LocalRegisterService {
    constructor(@Inject(UserRepository) private readonly userRepository: UserRepository) {}
    async execute(createUserType: CreateUserType, userId: string): Promise<UserDomain> {
        const user = UserDomain.of(createUserType, userId);

        await this.userRepository.createUser(user);
        user.validStatus();
        return user;
    }
}
