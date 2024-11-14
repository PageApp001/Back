import { QualityAttributes } from './../models/quality';
import db from "../models";
import IQualityRepository from './interfaces/quality.repository.interface';

export class QualityRepository implements IQualityRepository<QualityAttributes, number> {
    async findAll(): Promise<QualityAttributes[]> {
        try {
            const news = await db.Quality.findAll();
            return news;
        } catch (error) {
            throw new Error("Can't fetch all news.");
        }
    }

    async findOne(id: number): Promise<QualityAttributes> {
        try {
            const news = await db.Quality.findByPk(id);
            return news;
        } catch (error) {
            throw new Error("Can't find news with id: " + id);
        }
    }

    async create(payload: any): Promise<QualityAttributes> {
        try {
            const news = await db.Quality.create(payload);
            return news;
        } catch (error) {
            console.error(error);
            throw new Error(`Error creating news (repository) ${error}`);
        }
    }

    async update(id: number, payload: any): Promise<QualityAttributes> {
        const existingNews = await this.findOne(id);
        if (!existingNews) {
            throw new Error('News not found');
        }
        try {
            const updatedNews = await db.Quality.update(payload, { where: { id } });
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
            await db.Quality.destroy({ where: { id } });
        } catch (error) {
            throw new Error("Can't delete news");
        }
    }
}
