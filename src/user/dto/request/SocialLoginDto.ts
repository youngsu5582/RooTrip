import { SocialLoginType } from "src/user/types";

export interface SocialLoginDto{
    provider : SocialLoginType;
    code : string;
}