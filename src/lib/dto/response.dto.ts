export class ResponeDto<T = undefined>{
    status : true;
    message : string;
    data : T;
    constructor(message:string,data?:T){
        this.message = message;
        this.data = data ?? this.data;
    }
}