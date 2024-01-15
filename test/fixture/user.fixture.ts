import { User } from 'prisma/prisma-client';
import typia from 'typia';

export class UserFixture{
    public static create() : User{
        const user:User = typia.random<User>();
        return user;
    }
    public static createWithFixId() : User{
        const user : User = typia.random<User>();
        user.id = 'FixId';
        return user;
    }
}