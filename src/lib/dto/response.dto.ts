export class ResponeDto<T> {
    status = true;
    message: string;
    data: T;
    constructor(message: string, data?: T) {
        this.message = message;
        this.data = data ?? this.data;
    }
}
