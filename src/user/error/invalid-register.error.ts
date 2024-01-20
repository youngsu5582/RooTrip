import { CustomError } from 'src/lib/error/custom.error';

export class InvalidRegisterError extends CustomError {
    private static readonly message = '회원가입에 실패 했습니다.';
    private static readonly errorCode = 1001;
    constructor() {
        super(InvalidRegisterError.message, InvalidRegisterError.errorCode);
    }
}
