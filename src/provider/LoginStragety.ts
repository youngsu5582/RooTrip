

export interface LoginStragety{
    getAccessToken(code:string):Promise<string>;
    getUserInfo(accessToken:string);

}