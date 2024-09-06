import { Router } from "express";
import {createLink,deleteLink,getLink,getLinkById,updateLink} from '../controllers/link.controller'

const router = Router();

router.post('/link/create' , createLink);
router.get('/link', getLink);
router.get('/link/:id',getLinkById);
router.put('/link/update/:id', updateLink);
router.delete('/link/delete/:id' , deleteLink);

export default router;