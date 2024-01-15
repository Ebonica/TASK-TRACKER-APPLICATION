import { User } from 'src/schemas/user';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly userService;
    private readonly secretKey;
    constructor(userService: UsersService);
    private generateToken;
    create(user: User): Promise<{
        user: User;
        token: string;
    }>;
    signIn(credentials: {
        username: string;
        password: string;
    }): Promise<{
        user: User;
        token: string;
    }>;
    findOne(id: string): void;
}
