import {Router} from 'express'
import {createCarouselImage,deleteCarouselImage,getCarouselImages,updateCarouselImage} from '../controllers/carousel.controller'
import upload from '../config/multer.config';

const router = Router();

router.post('/carousel/create', upload.single('image'), createCarouselImage);
router.get('/carousel', getCarouselImages);
router.delete('/carousel/delete/:id', deleteCarouselImage);
router.put('/carousel/update/:id/', updateCarouselImage);

export default router;