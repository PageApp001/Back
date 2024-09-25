import { Router } from "express";
import {
  createNews,
  getNews,
  getNewsById,
  updateNews,
  deleteNews,
} from "../controllers/news.controller";
import { upload } from '../config/multer.config';

const router = Router();

router.post("/news/create", upload.single("image"), createNews);
router.get("/news", getNews);
router.get("/news/:id", getNewsById);
router.put("/news/update/:id", upload.single("image"), updateNews);
router.delete("/news/delete/:id", deleteNews);

export default router;
