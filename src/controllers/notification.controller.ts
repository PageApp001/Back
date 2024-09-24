// src/controllers/notification.controller.ts
import { Request, Response } from 'express';
import { SubscriptionAttributes } from '../models/subscription'; // Modelo definido en Sequelize

// Ruta para manejar la suscripción
export async function subscribe(req: Request, res: Response) {
  const SubscriptionAttributes = req.body;

  try {
    // Guardar la suscripción en la base de datos usando Sequelize
    const newSubscription = await SubscriptionAttributes.create({
      endpoint: SubscriptionAttributes.endpoint,
      keys: JSON.stringify(SubscriptionAttributes.keys) // Aseguramos que 'keys' se almacene como string en la DB
    });
   
    res.status(201).json({ message: 'Suscripción guardada exitosamente', data: newSubscription });
  } catch (error) {
    console.error('Error al guardar la suscripción:', error);
    res.status(500).json({ error: 'Ocurrió un error al guardar la suscripción' });
  }
}
