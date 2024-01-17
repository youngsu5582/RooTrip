import { Inject, Injectable } from '@nestjs/common';
import { CreateProfileType } from '../types/create-profile.type';
import { ProfileRepository } from 'src/user/repository/profile.repository';
import { ProfileDomain } from '../domain/profile.domain';

@Injectable()
export class ProfileCreateService {
    constructor(@Inject(ProfileRepository) private readonly profileRepository : ProfileRepository) {}
    async execute(createProfileType: CreateProfileType,userId:string) {
        const profile = ProfileDomain.of(createProfileType,userId);

        await this.profileRepository.createProfile(profile);

        return profile;
    }
}
 