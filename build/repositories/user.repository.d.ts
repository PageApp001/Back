import { UserAttributes } from "../models/user";
import IUserRepository from "./interfaces/user.repository.interface";
export declare class UserRepository implements IUserRepository<UserAttributes, string> {
    findAll(): Promise<UserAttributes[]>;
    findOne(email: string): Promise<UserAttributes>;
    create(payload: any, callback: any): Promise<UserAttributes>;
    update(email: string, payload: any): Promise<UserAttributes>;
    delete(email: string): Promise<UserAttributes>;
}
