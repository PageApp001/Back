export default interface IUserRepository<T, ID> {
    findAll(): Promise<T[]>;
    findOne(email: ID): Promise<T>;
    create(payload: any, callback: any): Promise<T>;
    update(email: ID, payload: any): Promise<T>;
    delete(email: ID): Promise<T>;
}
