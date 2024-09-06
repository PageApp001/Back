import { NewsAttributes } from "../models/news";
import INewsRepository from "./interfaces/news.repository.interface";
import db from "../models";

export class NewsRepository implements INewsRepository<NewsAttributes, number> {
    async findAll(): Promise<NewsAttributes[]> {
        try {
            const news = await db.News.findAll();
            return news;
        } catch (error) {
            throw new Error("Can't fetch all news.");
        }
    }

    async findOne(id: number): Promise<NewsAttributes> {
        try {
            const news = await db.News.findByPk(id);
            return news;
        } catch (error) {
            throw new Error("Can't find news with id: " + id);
        }
    }

    async create(payload: any, callback: any): Promise<NewsAttributes> {
        try {
            const news = await db.News.create(payload);
            return news;
        } catch (error) {
            console.error(error);
            throw new Error(`Error creating news (repository) ${error}`);
        }
    }

    async update(id: number, payload: any): Promise<NewsAttributes> {
        const existingNews = await this.findOne(id);
        if (!existingNews) {
            throw new Error('News not found');
        }
        try {
            const updatedNews = await db.News.update(payload, { where: { id } });
            return updatedNews;
        } catch (error) {
            throw new Error("Can't update news");
        }
    }

    async delete(id: number): Promise<void> {
        const existingNews = await this.findOne(id);
        if (!existingNews) {
            throw new Error('News not found');
        }
        try {
            await db.News.destroy({ where: { id } });
        } catch (error) {
            throw new Error("Can't delete news");
        }
    }
}
