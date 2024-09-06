import { EventsAttributes } from "../models/events";
import { EventsRepository } from "../repositories/events.repository";

export class EventsService {
    private eventsRepository: EventsRepository;

    constructor(){
        this.eventsRepository = new EventsRepository();
    }

    async create(data: EventsAttributes): Promise<EventsAttributes> {
        try {
            const news: EventsAttributes = await this.eventsRepository.create(data, null);
            return news;
        } catch (error) {
            throw error;
        }
    }

    async get(): Promise<EventsAttributes[]> {
        try {
            const news: EventsAttributes[] = await this.eventsRepository.findAll();
            return news;
        } catch (error) {
            throw error;
        }
    }

    async find(id: any): Promise<EventsAttributes> {
        try {
            const news: EventsAttributes = await this.eventsRepository.findOne(id);
            return news;
        } catch (error) {
            throw error;
        }
    }

    async update(id: any, data: EventsAttributes): Promise<EventsAttributes> {
        try {
            const news: EventsAttributes = await this.eventsRepository.update(id, data);
            return news;
        } catch (error) {
            throw error;
        }
    }

    async delete(id: any): Promise<void> {
        try {
            await this.eventsRepository.delete(id);
        } catch (error) {
            throw error;
        }
    }
}