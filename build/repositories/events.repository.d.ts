import { EventsAttributes } from "../models/events";
import IEventRepository from "./interfaces/events.repository.interface";
export declare class EventsRepository implements IEventRepository<EventsAttributes, number> {
    findAll(): Promise<EventsAttributes[]>;
    findOne(id: number): Promise<EventsAttributes>;
    create(payload: any, callback: any): Promise<EventsAttributes>;
    update(id: number, payload: any): Promise<EventsAttributes>;
    delete(id: number): Promise<void>;
}
