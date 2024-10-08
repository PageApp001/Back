import { Router } from "express";
import userRoutes from "./user.routes";
import adminRoutes from "./admin.routes";
import newsRoutes from "./news.routes";
import carouselRoutes from "./carousel.routes";
import linkRoutes from "./link.routes";
import birthdayRoutes from "./birthday.routes";
import eventRoutes from "./events.routes";
import imageRoutes from "./image.routes"


const router = Router();

// User routes
router.use(userRoutes);
//Admin routes
router.use(adminRoutes);
//News routes
router.use(newsRoutes);
//Carousel routes
router.use(carouselRoutes);
//Link routes
router.use(linkRoutes);
//Birthday routes
router.use(birthdayRoutes);
//Event routes
router.use(eventRoutes);
//Image routes
router.use(imageRoutes)

export default router;
