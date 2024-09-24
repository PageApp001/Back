export default interface ISubscriptionRepository<T, ID> {
    findAll(): Promise<T[]>;
    findOne(id: ID): Promise<T>;
    create(payload: any, callback: any): Promise<T>;
    update(id: ID, payload: any): Promise<T>;
    delete(id: ID): Promise<void>;
}
