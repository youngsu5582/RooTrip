import { CustomError } from 'src/lib/error/custom.error';

export class InvalidPasswordError extends CustomError {
    private static readonly message: '비밀번호가 일치하지 않습니다.';
    private static readonly errorCode: 1000;
    constructor() {
        super(InvalidPasswordError.message, InvalidPasswordError.errorCode);
    }
}
