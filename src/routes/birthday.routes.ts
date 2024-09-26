import { Router } from "express";
import {
  createBirthdaylImage,
  deleteBirthdayImage,
  getBirthdayImages,
} from "../controllers/birthday.controller";

import upload from "../config/multer.config";

const router = Router();

router.post("/birthday/create", upload.single("image"), createBirthdaylImage);
router.get("/birthday", getBirthdayImages);
router.delete("/birthday/delete/:id", deleteBirthdayImage);

export default router;
