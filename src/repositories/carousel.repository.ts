import { CarouselAttributes } from "../models/carousel";
import ICarouselRepository from "./interfaces/carousel.repository.interface";
import db from "../models";

export class CarouselRepository implements ICarouselRepository<CarouselAttributes, number> {
    async findAll(): Promise<CarouselAttributes[]> {
        try {
            return await db.Carousel.findAll(); // Asegúrate de que 'Carousel' no sea undefined
        } catch (error) {
            console.error("Direct error:", error);
            throw new Error("Can't fetch all carousel images.");
        }
    }

    async findOne(id: number): Promise<CarouselAttributes> {
        try {
            const image = await db.Carousel.findByPk(id);
            return image;
        } catch (error) {
            throw new Error("Can't find carousel image with id: " + id);
        }
    }

    async create(payload: any, callback: any): Promise<CarouselAttributes> {
        try {
            const image = await db.Carousel.create(payload);
            return image;
        } catch (error) {
            console.error(error);
            throw new Error(`Error creating carousel image (repository) ${error}`);
        }
    }

    async update(id: number, payload: any): Promise<CarouselAttributes> {
        const existingImage = await this.findOne(id);
        if (!existingImage) {
            throw new Error('Carousel image not found');
        }
        try {
            const updatedImage = await db.Carousel.update(payload, { where: { id } });
            return updatedImage;
        } catch (error) {
            throw new Error("Can't update carousel image");
        }
    }

    async delete(id: number): Promise<void> {
        const existingImage = await this.findOne(id);
        if (!existingImage) {
            throw new Error('Carousel image not found');
        }
        try {
            await db.Carousel.destroy({ where: { id } });
        } catch (error) {
            throw new Error("Can't delete carousel image");
        }
    }
}
