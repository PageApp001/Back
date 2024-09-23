export interface SubscriptionAttributes {
    id?: number;
    endpoint: string;
    expirationTime?: Date | null;
    keys: {
        p256dh: string;
        auth: string;
    };
}
