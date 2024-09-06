import { UserAttributes } from "../models/user";
import IUserRepository from "./interfaces/user.repository.interface";
import db from "../models";
import bcrypt from 'bcrypt';


export class UserRepository implements IUserRepository<UserAttributes, string> {
    async findAll(): Promise<UserAttributes[]> {
        try {
            const users = await db.User.findAll();
            return users;
        } catch (error) {
            throw new Error("Can't fetch all users.");
        }
    }
    async findOne(email: string): Promise<UserAttributes> {
        try {
            const user = await db.User.findOne({ where: { email: email } });
            return user;
        } catch (error) {
            throw new Error("Can't find user with email: " + email);
        }
    }
    async create(payload: any, callback: any): Promise<UserAttributes> {

        let { id, nombre, apellido, cargo, dependencia, email, password, role} = payload;
        const hashedPassword = await bcrypt.hash(password, 10);
        const alreadyExist = await db.User.findOne({ where: { email } });
        if (alreadyExist) {
            throw new Error('User already exist');
        }
        try {
            const userRole = role || 'user'; // Si no se proporciona, utilizar el valor predeterminado 'user'

            const user = await db.User.create({
                id: id,
                nombre: nombre,
                apellido: apellido,
                cargo: cargo,
                dependencia: dependencia,
                email: email,
                password: hashedPassword,
                role: userRole
            });
            return user;
        } catch (error) {
            console.error(error);
            throw new Error(`Error creating user (repository) ${error}`);
        }
    }
    async update(email: string, payload: any): Promise<UserAttributes> {
        const alreadyExist = await this.findOne(email);
        if (alreadyExist == null) {
            throw new Error('User not found');
        }
        try {
            const newUser = await db.User.update(payload, { where: { email } });
            return newUser;
        } catch (error) {
            throw new Error("Can't update user");
        }
    }
    async delete(email: string): Promise<UserAttributes> {
        const alreadyExist = await this.findOne(email);
        if (alreadyExist == null) {
            throw new Error('User not found');
        }
        try {
            const userDeleted = await db.User.destroy({ where: { email } });
            return userDeleted;
        } catch (error) {
            throw new Error("Can't delete user");
        }
    }

}