
import { Router } from 'express';
import { subscribe } from '../controllers/notification.controller';

const router = Router();

router.post('/subscribe', subscribe);

export default router;
