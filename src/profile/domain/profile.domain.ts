import {Profile} from '@prisma/client';
import { randomId } from 'src/util/random-id.util';
import { CreateProfileType } from '../types/create-profile.type';

export enum ProfileStatus{
    'REGISTER_PREPARE',
    'REGISTER_SUCCESS',
    'REGISTER_FAILED',
    'PROFILE_RETRIVED'
}

export class ProfileDomain{

    public readonly profile : Readonly<Profile>;
    public status : ProfileStatus;
    
    private constructor(profile : Profile,status : ProfileStatus){
        this.profile = profile;
        this.status = status;
    }
    public static of({name,nickname} : CreateProfileType,userId:string){
        const id = randomId();
        const profile  = {name,nickname,bio:'',id,profileImageUrl:'',userId};
        return new ProfileDomain(profile,ProfileStatus.REGISTER_PREPARE);
    }
    public static from(profile : Profile):ProfileDomain{
        return new ProfileDomain(profile,ProfileStatus.PROFILE_RETRIVED);
    }
}