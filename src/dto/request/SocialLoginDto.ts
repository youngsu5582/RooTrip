import { SocialLoginType } from "src/types";

export interface SocialLoginDto{
    provider : SocialLoginType;
    code : string;
}