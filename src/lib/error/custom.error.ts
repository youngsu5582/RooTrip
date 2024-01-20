export class CustomError extends Error {
    private readonly status = false;
    private readonly errorCode: number;
    constructor(message: string, errorCode: number) {
        super(message);
        this.errorCode = errorCode;
        this.message = message;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
