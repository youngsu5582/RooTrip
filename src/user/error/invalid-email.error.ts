import { CustomError } from 'src/lib/error/custom.error';

export class InvalidEmailError extends CustomError {
    private static readonly message = '이메일이 일치하지 않습니다.';
    private static readonly errorCode = 1002;
    constructor() {
        super(InvalidEmailError.message, InvalidEmailError.errorCode);
    }
}
