import { CarouselAttributes } from "../models/carousel";
export declare class CarouselService {
    private carouselRepository;
    constructor();
    create(data: CarouselAttributes): Promise<CarouselAttributes>;
    get(): Promise<CarouselAttributes[]>;
    find(id: any): Promise<CarouselAttributes>;
    update(id: any, data: CarouselAttributes): Promise<CarouselAttributes>;
    delete(id: any): Promise<void>;
}
