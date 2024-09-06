import { UserAttributes } from "../models/user";
import { UserRepository } from "../repositories/user.repository";

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data: UserAttributes): Promise<UserAttributes> {
        try {
            const user: UserAttributes = await this.userRepository.create(data, null);
            return user;
        } catch (error) {
            throw error;
        }
    }
    async get(): Promise<UserAttributes[]> {
        try {
            const users: UserAttributes[] = await this.userRepository.findAll();
            return users;
        } catch (error) {
            throw error;
        }
    }
    async find(id: any): Promise<UserAttributes> {
        try {
            const user: UserAttributes = await this.userRepository.findOne(id);
            return user;
        } catch (error) {
            throw error;
        }
    }
    async update(id: any, data: UserAttributes): Promise<UserAttributes> {
        try {
            const user: UserAttributes = await this.userRepository.update(id, data);
            return user;
        } catch (error) {
            throw error;
        }
    }
    async delete(id: any): Promise<UserAttributes> {
        try {
            const user: UserAttributes = await this.userRepository.delete(id);
            return user;
        } catch (error) {
            throw error;
        }
    }


}