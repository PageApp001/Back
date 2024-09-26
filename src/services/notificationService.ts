import * as webPush from 'web-push';
import { PushSubscription } from 'web-push';
import { UserRepository } from '../repositories/user.repository';
import Subscription from "../models/subscription";

webPush.setVapidDetails(
  'mailto:tu-correo@example.com',
  'BG9EAv52WeRHgTyvrAvPehvsH_FKd0ZzVQigrs1tjBoLSXD706bRrqJgvSSl-wDw7Dcj33-w6EN2r8K3lISOfnA',
  'uLsfKmvKmXkTtNOMuDMBK_Y2oJTjgcNYRRrqrrmLdnI'
);

export async function sendPushNotification(data: any) {
  const userRepository = new UserRepository();
  
  // Obtén todos los usuarios junto con sus suscripciones
  const users = await userRepository.findAll();

  if (!users || users.length === 0) {
    throw new Error('No hay usuarios disponibles para la notificación');
  }

  const sendNotifications = users.map(async (user: any) => {
    const subscription: PushSubscription = user.Subscription; // Accede a la suscripción del usuario

    if (!subscription) {
      console.warn(`El usuario ${user.firstName} ${user.lastName} no tiene una suscripción para notificaciones push.`);
      return;
    }

    const payload = JSON.stringify({
      title: data.title,
      body: data.body,
      icon: data.icon,
      url: data.url,
    });

    return webPush.sendNotification(subscription, payload).catch((error) => {
      console.error(`Error al enviar la notificación push al usuario ${user.firstName} ${user.lastName}:`, error);
    });
  });

  await Promise.all(sendNotifications);
  console.log('Notificaciones enviadas a todos los usuarios');
}
