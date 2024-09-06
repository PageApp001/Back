import { CarouselAttributes } from "../models/carousel";
import { CarouselRepository } from "../repositories/carousel.repository";

export class CarouselService {
    private carouselRepository: CarouselRepository;

    constructor() {
        this.carouselRepository = new CarouselRepository();
    }

    async create(data: CarouselAttributes): Promise<CarouselAttributes> {
        try {
            const image: CarouselAttributes = await this.carouselRepository.create(data, null);
            return image;
        } catch (error) {
            throw error;
        }
    }

    async get(): Promise<CarouselAttributes[]> {
        try {
            const images: CarouselAttributes[] = await this.carouselRepository.findAll();
            return images;
        } catch (error) {
            throw error;
        }
    }

    async find(id: any): Promise<CarouselAttributes> {
        try {
            const image: CarouselAttributes = await this.carouselRepository.findOne(id);
            return image;
        } catch (error) {
            throw error;
        }
    }

    async update(id: any, data: CarouselAttributes): Promise<CarouselAttributes> {
        try {
            const image: CarouselAttributes = await this.carouselRepository.update(id, data);
            return image;
        } catch (error) {
            throw error;
        }
    }

    async delete(id: any): Promise<void> {
        try {
            await this.carouselRepository.delete(id);
        } catch (error) {
            throw error;
        }
    }
}
