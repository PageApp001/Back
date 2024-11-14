import { Router } from "express";
import {
  createQuality,
  getQuality,
  getQualityById,
  deleteQuality,
  updateQuality,
  uploadFolderStructure,
} from "../controllers/quality.controller";
const router = Router();
router.post("/quality/create", createQuality);
router.get("/quality", getQuality);
router.put("/quality/update/:id", updateQuality);
router.get("/quality/:id", getQualityById);
router.delete("/quality/delete/:id", deleteQuality);
router.post("/quality/upload-folder", uploadFolderStructure);
export default router;
