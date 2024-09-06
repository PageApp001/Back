import { UserAttributes } from "../models/user";
export declare class UserService {
    private userRepository;
    constructor();
    create(data: UserAttributes): Promise<UserAttributes>;
    get(): Promise<UserAttributes[]>;
    find(id: any): Promise<UserAttributes>;
    update(id: any, data: UserAttributes): Promise<UserAttributes>;
    delete(id: any): Promise<UserAttributes>;
}
