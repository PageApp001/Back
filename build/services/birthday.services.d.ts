import { BirthdayAttributes } from "../models/birthday";
export declare class BirthdayService {
    private carouselRepository;
    constructor();
    create(data: BirthdayAttributes): Promise<BirthdayAttributes>;
    get(): Promise<BirthdayAttributes[]>;
    find(id: any): Promise<BirthdayAttributes>;
    update(id: any, data: BirthdayAttributes): Promise<BirthdayAttributes>;
    delete(id: any): Promise<void>;
}
