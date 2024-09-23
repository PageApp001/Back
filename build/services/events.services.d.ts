import { EventsAttributes } from "../models/events";
export declare class EventsService {
    private eventsRepository;
    constructor();
    create(data: EventsAttributes): Promise<EventsAttributes>;
    get(): Promise<EventsAttributes[]>;
    find(id: any): Promise<EventsAttributes>;
    update(id: any, data: EventsAttributes): Promise<EventsAttributes>;
    delete(id: any): Promise<void>;
}
