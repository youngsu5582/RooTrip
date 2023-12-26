export interface SocialLoginStragety {
    getAuthenticate(code: string): Promise<string>;
    getUserInfo(accessToken: string): Promise<any>;
}
