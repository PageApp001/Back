import * as webPush from 'web-push';
import { PushSubscription } from 'web-push';


webPush.setVapidDetails(
  'mailto:tu-correo@example.com',
  'BCxp2qn_2N3JPP9dbgFMAxwclxNiVt5XHAtadIDt4VtGz025nStzS7ho2Jwm09URIzNnkkcNAJomRM_p-WU',
  '9_vFDbaWTNLcDgLfIA7gfioq0HzKycP5fzon_LVv8mA'
);


export function sendPushNotification(subscription: PushSubscription, data: any) {
  const payload = JSON.stringify({
    title: data.title,
    body: data.body,
    icon: data.icon,
    url: data.url,
  });

  return webPush.sendNotification(subscription, payload)
    .catch((error) => {
      console.error('Error al enviar la notificación push:', error);
    });
}
