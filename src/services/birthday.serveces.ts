import { BirthdayAttributes } from "../models/birthday";
import { BirthdayRepository } from "../repositories/birthday.repository";

export class BirthdayService {
    private carouselRepository: BirthdayRepository;

    constructor() {
        this.carouselRepository = new BirthdayRepository();
    }

    async create(data: BirthdayAttributes): Promise<BirthdayAttributes> {
        try {
            const image: BirthdayAttributes = await this.carouselRepository.create(data, null);
            return image;
        } catch (error) {
            throw error;
        }
    }

    async get(): Promise<BirthdayAttributes[]> {
        try {
            const images: BirthdayAttributes[] = await this.carouselRepository.findAll();
            return images;
        } catch (error) {
            throw error;
        }
    }

    async find(id: any): Promise<BirthdayAttributes> {
        try {
            const image: BirthdayAttributes = await this.carouselRepository.findOne(id);
            return image;
        } catch (error) {
            throw error;
        }
    }

    async update(id: any, data: BirthdayAttributes): Promise<BirthdayAttributes> {
        try {
            const image: BirthdayAttributes = await this.carouselRepository.update(id, data);
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
