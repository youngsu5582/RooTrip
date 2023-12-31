import axios from 'axios';

import { SocialLoginStragety } from './login.stragety';

type KakaoParamType = {
    grant_type: string;
    client_id: string;
    code: string;
    redirect_uri: string;
};

export class KakaoLoginStragety implements SocialLoginStragety {
    private static readonly KAKAO_AUTH_URL = 'https://kauth.kakao.com/oauth/token';
    private static readonly KAKAO_USER_URL = 'https://kapi.kakao.com/v2/user/me';
    private readonly KAKAO_API_KEY: string;
    constructor(private readonly key: string) {
        this.KAKAO_API_KEY = key;
    }
    public async getAuthenticate(code: string): Promise<string> {
        const params = this.getParams(code);
        const data = await this.authenticate(params);
        return data.accessToken;
    }
    public async getUserInfo(accessToken: string) {
        const response = await axios.post(
            KakaoLoginStragety.KAKAO_USER_URL,
            {},
            {
                headers: {
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    'Content-Type': 'application/x-www-form-urlencoded;charset',
                    Authorization: 'Bearer ' + accessToken,
                },
            },
        );
        return response.data;
    }
    private async authenticate(params: KakaoParamType) {
        const response = await axios.post(
            KakaoLoginStragety.KAKAO_AUTH_URL,
            {},
            {
                headers: {
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                params,
            },
        );
        return response.data;
    }
    private getParams(code: string): KakaoParamType {
        return {
            grant_type: 'authorization_code',
            client_id: this.KAKAO_API_KEY,
            code,
            redirect_uri: KakaoLoginStragety.KAKAO_AUTH_URL,
        };
    }
}
