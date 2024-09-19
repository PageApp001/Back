import { BirthdayAttributes } from "../models/birthday";
import IBirthdaylRepository from "./interfaces/birthday.repository.interface";
import db from "../models";

export class BirthdayRepository implements IBirthdaylRepository<BirthdayAttributes, number> {
    async findAll(): Promise<BirthdayAttributes[]> {
        try {
            return await db.Birthday.findAll(); 
        } catch (error) {
            console.error("Direct error:", error);
            throw new Error("Can't fetch all images.");
        }
    }

    async findOne(id: number): Promise<BirthdayAttributes> {
        try {
            const image = await db.Birthday.findByPk(id);
            return image;
        } catch (error) {
            throw new Error("Can't find image with id: " + id);
        }
    }

    async create(payload: any, callback: any): Promise<BirthdayAttributes> {
        try {
            const image = await db.Birthday.create(payload);
            return image;
        } catch (error) {
            console.error(error);
            throw new Error(`Error creating image (repository) ${error}`);
        }
    }

    async update(id: number, payload: any): Promise<BirthdayAttributes> {
        const existingImage = await this.findOne(id);
        if (!existingImage) {
            throw new Error('image not found');
        }
        try {
            const updatedImage = await db.Birthday.update(payload, { where: { id } });
            return updatedImage;
        } catch (error) {
            throw new Error("Can't update image");
        }
    }

    async delete(id: number): Promise<void> {
        const existingImage = await this.findOne(id);
        if (!existingImage) {
            throw new Error('image not found');
        }
        try {
            await db.Birthday.destroy({ where: { id } });
        } catch (error) {
            throw new Error("Can't delete image");
        }
    }
}
