import { User } from 'prisma/prisma-client';
import { UserDomain } from 'src/user/domain/user.domain';
import { randomId } from 'src/util/random-id.util';
import typia from 'typia';

export class UserFixture{
    private static data : UserDomain[];
    static{
        this.data = Array.from({length:5},()=>this.createUserDomain());
    }
    public static get() : User{
        const user:User = typia.random<User>();
        return user;
    }
    public static getWithFixId() : User{
        const user : User = typia.random<User>();
        user.id = 'FixId';
        return user;
    }
    public static getDomain(index=0) : UserDomain{
        return this.data[index];
    }
    public static getDomains() : UserDomain[]{
        return this.data;
    }
    private static createUserDomain() :UserDomain{
        const user = typia.random<User>();
        const userId = randomId();
        return UserDomain.of(user,userId);
    }
}