import { Inject, Injectable } from '@nestjs/common';
import { UserDomain } from '../domain/user.domain';
import { UserRepository } from '../repository/user.repository';
import { TokenProcessor } from 'src/lib/token/provider/token-processor.provider';
import { TokenPayloadType } from '../types/create-refresh-token.type';
import { LoginTokenInfoType } from '../types';
import { LocalLoginRequestDto } from '../dto/request/local-login.request.dto';

@Injectable()
export class LocalLoginService {
    constructor(
        @Inject(UserRepository) private readonly userRepository: UserRepository,
        private readonly tokenProcessor: TokenProcessor<TokenPayloadType>,
    ) {}
    async execute(localLoginDto: LocalLoginRequestDto): Promise<LoginTokenInfoType> {
        const userDomain = await this.findUser(localLoginDto);

        const loginTokenInfo = this.generateTokenInfo(userDomain);

        await this.userRepository.saveRefreshToken(userDomain, loginTokenInfo.refreshToken);
        return loginTokenInfo;
    }

    private async findUser(localLoginDto: LocalLoginRequestDto): Promise<UserDomain> {
        const { email, password } = localLoginDto;

        const userDomain = await this.userRepository.findUserDomainByEmail(email);

        userDomain.validEmail(email);
        userDomain.validPassword(password);
        return userDomain;
    }
    private generateTokenInfo(userDomain: UserDomain): LoginTokenInfoType {
        const tokenPayload = userDomain.getTokenPayload();

        const accessToken = this.tokenProcessor.generateAccessToken(tokenPayload);
        const refreshToken = this.tokenProcessor.generateRefreshToken(tokenPayload);
        const expire = this.tokenProcessor.getAccessTokenExpire();

        return { accessToken, refreshToken, expire };
    }
}
