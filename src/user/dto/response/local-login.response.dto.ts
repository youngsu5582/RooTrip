import { ResponeDto } from 'src/lib/dto/response.dto';
import { LoginTokenInfoType } from 'src/user/types';

export class LocalLoginResponseDto extends ResponeDto<LoginTokenInfoType> {
    private static readonly message: '로그인에 성공했습니다.';
    constructor(data: LoginTokenInfoType) {
        super(LocalLoginResponseDto.message, data);
    }
}
