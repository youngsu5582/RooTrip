import { randomBytes } from 'crypto';

export function createSalt(){
    return randomBytes(16).toString('hex');
}