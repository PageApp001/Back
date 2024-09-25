import { Request, Response } from 'express';
import { PushSubscription } from 'web-push';
import { SubscriptionRepository } from '../repositories/subscription.repository';
import { sendPushNotification } from '../services/notificationService';


export async function subscribe(req: Request, res: Response) {
  const subscriptionData = req.body;

  try {
    // Valida los datos
    if (!subscriptionData.endpoint || !subscriptionData.keys) {
      return res.status(400).json({ error: 'Faltan datos de suscripción' });
    }

    // Guarda la suscripción en la base de datos
    const subscriptionRepository = new SubscriptionRepository();
    const newSubscription = await subscriptionRepository.create({
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


    await sendPushNotification(subscriptionData as PushSubscription);

  } catch (error) {
    console.error('Error al guardar la suscripción o enviar notificación:', error);
    res.status(500).json({ error: 'Ocurrió un error al guardar la suscripción o enviar notificación' });
  }
}
