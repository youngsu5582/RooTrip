import { LoginStragety } from "./LoginStragety";

export class LocalLoginStragety implements LoginStragety{


    getAuthenticate(code: string): Promise<string> {
        
    }
    getUserInfo(accessToken: string): Promise<any> {
        
    }
}