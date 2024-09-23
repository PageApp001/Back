import { LinkAttributes } from "../models/link";
import ILinkRepository from "./interfaces/link.repository.interface";
export declare class LinkRepository implements ILinkRepository<LinkAttributes, number> {
    findAll(): Promise<LinkAttributes[]>;
    findOne(id: number): Promise<LinkAttributes>;
    create(payload: any, callback: any): Promise<LinkAttributes>;
    update(id: number, payload: any): Promise<LinkAttributes>;
    delete(id: number): Promise<void>;
}
