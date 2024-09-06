import { EventsAttributes } from "../models/events";
import IEventRepository from "./interfaces/events.repository.interface";
import db from '../models'

export class EventsRepository implements IEventRepository<EventsAttributes, number> {
    async findAll(): Promise<EventsAttributes[]> {
        try {
            const event = await db.Events.findAll();
            return event
        } catch (error) {
            throw new Error("Can't fetch all events")
        }
    }

    async findOne(id: number): Promise<EventsAttributes> {
        try {
            const event = await db.Events.findById(id);
            return event
        } catch (error) {
            throw new Error("can't find event with id: " + id)
        }
    }
    async create(payload: any, callback: any): Promise<EventsAttributes> {
        try {
            const event = await db.Evens.create(payload)
            return event
        } catch (error) {
            console.log(error);
            throw new Error(`Error creating event (repository) ${error}`)
        }
    }
    async update(id: number, payload: any): Promise<EventsAttributes> {
        const existingEvent = await this.findOne(id);
        if (!existingEvent) {
            throw new Error('Event not found')
        }
        try {
            const updateEvents = await db.Events.update(payload, { where: { id } });
            return updateEvents;
        } catch (error) {
            throw new Error("Can't update event");
        }
    }
    async delete(id: number): Promise<void> {
        const existingEvent = await db.Events.findOne(id)
        if (!existingEvent) {
            throw new Error('Event not found');
        }
        try {
            await db.Events.destroy({ where: { id } })
        } catch (error) {
            throw new Error ("Can't delete event")
        }
    }
}