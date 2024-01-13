import {pbkdf2Sync} from 'crypto';
export function hashString(plainText : string,salt:string){
    return pbkdf2Sync(plainText,salt,100,16,'sha256').toString('hex');
}