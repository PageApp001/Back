const webPush = require('web-push');

// Configuración de las claves VAPID
webPush.setVapidDetails(
    'mailto:youremail@example.com',
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
);

module.exports = {
    sendPushNotification: (subscription: any, payload: any) => {
        return webPush.sendNotification(subscription, payload);
    }
};
