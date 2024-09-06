import { NewsAttributes } from "../models/news";
import { NewsRepository } from "../repositories/news.repository";

export class NewsService {
    private newsRepository: NewsRepository;

    constructor() {
        this.newsRepository = new NewsRepository();
    }

    async create(data: NewsAttributes): Promise<NewsAttributes> {
        try {
            const news: NewsAttributes = await this.newsRepository.create(data, null);
            return news;
        } catch (error) {
            throw error;
        }
    }

    async get(): Promise<NewsAttributes[]> {
        try {
            const news: NewsAttributes[] = await this.newsRepository.findAll();
            return news;
        } catch (error) {
            throw error;
        }
    }

    async find(id: any): Promise<NewsAttributes> {
        try {
            const news: NewsAttributes = await this.newsRepository.findOne(id);
            return news;
        } catch (error) {
            throw error;
        }
    }

    async update(id: any, data: NewsAttributes): Promise<NewsAttributes> {
        try {
            const news: NewsAttributes = await this.newsRepository.update(id, data);
            return news;
        } catch (error) {
            throw error;
        }
    }

    async delete(id: any): Promise<void> {
        try {
            await this.newsRepository.delete(id);
        } catch (error) {
            throw error;
        }
    }
}
