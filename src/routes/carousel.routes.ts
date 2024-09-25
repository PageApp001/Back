import { Router } from "express";
import { upload } from '../config/multer.config'; // la configuración de multer
import {
  createCarouselImage,
  deleteCarouselImage,
  getCarouselImages,
  updateCarouselImage,
} from "../controllers/carousel.controller";

const router = Router();

router.post("/carousel/create", upload.single('image'), createCarouselImage);
router.get("/carousel", getCarouselImages);
router.delete("/carousel/delete/:id", deleteCarouselImage);
router.put("/carousel/update/:id/", upload.single('image'), updateCarouselImage);

export default router;
