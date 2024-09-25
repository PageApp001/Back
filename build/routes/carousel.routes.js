"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_config_1 = require("../config/multer.config"); // la configuración de multer
const carousel_controller_1 = require("../controllers/carousel.controller");
const router = (0, express_1.Router)();
router.post("/carousel/create", multer_config_1.upload.single('image'), carousel_controller_1.createCarouselImage);
router.get("/carousel", carousel_controller_1.getCarouselImages);
router.delete("/carousel/delete/:id", carousel_controller_1.deleteCarouselImage);
router.put("/carousel/update/:id/", multer_config_1.upload.single('image'), carousel_controller_1.updateCarouselImage);
exports.default = router;
