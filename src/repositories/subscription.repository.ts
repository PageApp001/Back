import { SubscriptionAttributes } from './../models/subscription';
import INewsRepository from "./interfaces/news.repository.interface";
import db from "../models";


export class SubscriptionRepository implements INewsRepository<SubscriptionAttributes, number> {
    async findAll(): Promise<SubscriptionAttributes[]> {
        try {
            const subscription = await db.Subscription.findAll();
            return subscription;
        } catch (error) {
            throw new Error("Can't fetch all news.");
        }
    }

    async findOne(id: number): Promise<SubscriptionAttributes> {
        try {
            const subscription = await db.Subscription.findByPk(id);
            return subscription;
        } catch (error) {
            throw new Error("Can't find Subscription with id: " + id);
        }
    }

    async create(payload: any): Promise<SubscriptionAttributes> {
        try {
            const subscription = await db.Subscription.create(payload);
            return subscription;
        } catch (error) {
            console.error(error);
            throw new Error(`Error creating Subscription (repository) ${error}`);
        }
    }

    async update(id: number, payload: any): Promise<SubscriptionAttributes> {
        const existingSubscription = await this.findOne(id);
        if (!existingSubscription) {
            throw new Error('News not found');
        }
        try {
            const updatedSubscription = await db.Subscription.update(payload, { where: { id } });
            return updatedSubscription;
        } catch (error) {
            throw new Error("Can't update Subscription");
        }
    }

    async delete(id: number): Promise<void> {
        const existingSubscription = await this.findOne(id);
        if (!existingSubscription) {
            throw new Error('News not found');
        }
        try {
            await db.Subscription.destroy({ where: { id } });
        } catch (error) {
            throw new Error("Can't delete Subscription");
        }
    }
}
