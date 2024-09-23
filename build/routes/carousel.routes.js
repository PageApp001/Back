"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carousel_controller_1 = require("../controllers/carousel.controller");
const multer_config_1 = __importDefault(require("../config/multer.config"));
const router = (0, express_1.Router)();
router.post("/carousel/create", multer_config_1.default.single("image"), carousel_controller_1.createCarouselImage);
router.get("/carousel", carousel_controller_1.getCarouselImages);
router.delete("/carousel/delete/:id", carousel_controller_1.deleteCarouselImage);
router.put("/carousel/update/:id/", carousel_controller_1.updateCarouselImage);
exports.default = router;
