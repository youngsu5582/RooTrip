import { ResponeDto } from 'src/lib/dto/response.dto';

export class LocalRegisterResponseDto extends ResponeDto {
    private static readonly message: '회원가입에 성공했습니다.';
    constructor() {
        super(LocalRegisterResponseDto.message);
    }
}
