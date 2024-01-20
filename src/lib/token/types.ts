import { JwtPayload } from 'jsonwebtoken';
export type CustomJwtPayload<T> = Required<NonNullable<Pick<JwtPayload, 'iat' | 'exp'>>> & {
    payload: T;
};
