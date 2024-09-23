import { LinkAttributes } from "../models/link";
export declare class LinkService {
    private linkRepository;
    constructor();
    create(data: LinkAttributes): Promise<LinkAttributes>;
    get(): Promise<LinkAttributes[]>;
    find(id: any): Promise<LinkAttributes>;
    update(id: any, data: LinkAttributes): Promise<LinkAttributes>;
    delete(id: any): Promise<void>;
}
