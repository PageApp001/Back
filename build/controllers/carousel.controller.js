"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCarouselImage = exports.updateCarouselImage = exports.getCarouselImages = exports.createCarouselImage = void 0;
const carousel_services_1 = require("../services/carousel.services");
const createCarouselImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const carouselService = new carousel_services_1.CarouselService();
    try {
        const { link } = req.body;
        const imagen = req.file ? req.file.filename : null;
        const carousel = yield carouselService.create({ link, imagen });
        if (!imagen) {
            return res.status(400).json({ message: "Image is required" });
        }
        return res.status(201).json({
            message: "Image created successfully",
            data: carousel
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});
exports.createCarouselImage = createCarouselImage;
const getCarouselImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const carouselService = new carousel_services_1.CarouselService();
    try {
        const carousel = yield carouselService.get();
        return res.status(200).json(carousel);
    }
    catch (error) {
        console.error("Error fetching carousel images:", error);
        return res.status(500).json({ message: "Can't fetch all carousel images." });
    }
});
exports.getCarouselImages = getCarouselImages;
const updateCarouselImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const carouselService = new carousel_services_1.CarouselService();
    try {
        // Si no se envía una nueva imagen, conservamos la imagen existente
        const existingImage = yield carouselService.find(id);
        const imagen = existingImage.imagen;
        const { link } = req.body;
        const carousel = yield carouselService.update(id, { imagen, link });
        return res.status(200).json({
            message: "Image updated successfully",
            data: carousel
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});
exports.updateCarouselImage = updateCarouselImage;
const deleteCarouselImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const carouselService = new carousel_services_1.CarouselService();
    try {
        yield carouselService.delete(id);
        return res.status(200).json({
            message: "Image deleted successfully"
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});
exports.deleteCarouselImage = deleteCarouselImage;
