
import { Router } from 'express';
import { sendNotification, subscribe } from '../controllers/notification.controller';

const router = Router();

router.post('/subscribe', subscribe);

router.post('/send', sendNotification)

export default router;
