import { NewsAttributes } from "../models/news";
import INewsRepository from "./interfaces/news.repository.interface";
export declare class NewsRepository implements INewsRepository<NewsAttributes, number> {
    findAll(): Promise<NewsAttributes[]>;
    findOne(id: number): Promise<NewsAttributes>;
    create(payload: any, callback: any): Promise<NewsAttributes>;
    update(id: number, payload: any): Promise<NewsAttributes>;
    delete(id: number): Promise<void>;
}
