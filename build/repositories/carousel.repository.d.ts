import { CarouselAttributes } from "../models/carousel";
import ICarouselRepository from "./interfaces/carousel.repository.interface";
export declare class CarouselRepository implements ICarouselRepository<CarouselAttributes, number> {
    findAll(): Promise<CarouselAttributes[]>;
    findOne(id: number): Promise<CarouselAttributes>;
    create(payload: any, callback: any): Promise<CarouselAttributes>;
    update(id: number, payload: any): Promise<CarouselAttributes>;
    delete(id: number): Promise<void>;
}
