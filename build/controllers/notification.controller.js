"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribe = void 0;
const subscription_repository_1 = require("../repositories/subscription.repository");
const notificationService_1 = require("../services/notificationService");
function subscribe(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const subscriptionData = req.body;
        try {
            // Valida los datos
            if (!subscriptionData.endpoint || !subscriptionData.keys) {
                return res.status(400).json({ error: 'Faltan datos de suscripción' });
            }
            // Guarda la suscripción en la base de datos
            const subscriptionRepository = new subscription_repository_1.SubscriptionRepository();
            const newSubscription = yield subscriptionRepository.create({
                endpoint: subscriptionData.endpoint,
                keys: JSON.stringify(subscriptionData.keys),
            });
            // Responde que la suscripción fue guardada exitosamente
            res.status(201).json({ message: 'Suscripción guardada exitosamente', data: newSubscription });
            // Datos para la notificación
            const notificationData = {
                title: 'Bienvenido a las notificaciones',
                body: 'Gracias por suscribirte a nuestras notificaciones push!',
                icon: '/icon.png', // Icono de la notificación
                url: 'https://front-xi-ashen.vercel.app/home',
            };
            yield (0, notificationService_1.sendPushNotification)(subscriptionData);
        }
        catch (error) {
            console.error('Error al guardar la suscripción o enviar notificación:', error);
            res.status(500).json({ error: 'Ocurrió un error al guardar la suscripción o enviar notificación' });
        }
    });
}
exports.subscribe = subscribe;
