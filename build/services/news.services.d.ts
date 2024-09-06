import { NewsAttributes } from "../models/news";
export declare class NewsService {
    private newsRepository;
    constructor();
    create(data: NewsAttributes): Promise<NewsAttributes>;
    get(): Promise<NewsAttributes[]>;
    find(id: any): Promise<NewsAttributes>;
    update(id: any, data: NewsAttributes): Promise<NewsAttributes>;
    delete(id: any): Promise<void>;
}
