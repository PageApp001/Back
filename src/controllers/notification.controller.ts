// import { webPush } from 'web-push';
const Subscription = require('../models/subscription');

// Registrar una nueva suscripción
export const subscribe = async (req: any, res: any) => {
    try {
        const subscription = new Subscription(req.body);
        await subscription.save();
        res.status(201).json({ message: 'Subscription saved successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save subscription' });
    }
};

// Enviar una notificación push
export const sendNotification = async (req: any, res: any) => {
    const { title, message } = req.body;
    try {
        const subscriptions = await Subscription.find({});
        const payload = JSON.stringify({ title, message });

        subscriptions.forEach((subscription: any) => {
            webPush.sendNotification(subscription, payload).catch((error: any) => console.error(error));
        });

        res.status(200).json({ message: 'Notification sent successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send notification' });
    }
};
