import { BirthdayAttributes } from "../models/birthday";
import IBirthdaylRepository from "./interfaces/birthday.repository.interface";
export declare class BirthdayRepository implements IBirthdaylRepository<BirthdayAttributes, number> {
    findAll(): Promise<BirthdayAttributes[]>;
    findOne(id: number): Promise<BirthdayAttributes>;
    create(payload: any, callback: any): Promise<BirthdayAttributes>;
    update(id: number, payload: any): Promise<BirthdayAttributes>;
    delete(id: number): Promise<void>;
}
