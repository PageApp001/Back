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
const cloudinary_service_1 = require("../services/cloudinary.service");
const cloudinaryService = new cloudinary_service_1.CloudinaryService();
const createCarouselImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const carouselService = new carousel_services_1.CarouselService();
    try {
        const { link } = req.body;
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: "Image is required" });
        }
        // Subir la imagen a Cloudinary
        const result = yield cloudinaryService.uploadImage(file);
        const carousel = yield carouselService.create({
            imagen: result.secure_url, // Usar la URL de la imagen en Cloudinary
            link,
        });
        return res.status(201).json({
            message: "Image created successfully",
            data: carousel,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
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
        return res
            .status(500)
            .json({ message: "Can't fetch all carousel images." });
    }
});
exports.getCarouselImages = getCarouselImages;
const updateCarouselImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const carouselService = new carousel_services_1.CarouselService();
    try {
        const existingImage = yield carouselService.find(id);
        const file = req.file;
        const { link } = req.body;
        let newImageUrl = existingImage.imagen; // Mantener la imagen existente
        // Si hay una nueva imagen, subirla a Cloudinary
        if (file) {
            const result = yield cloudinaryService.uploadImage(file);
            newImageUrl = result.secure_url; // Actualizar la URL con la nueva imagen
        }
        const updatedCarousel = yield carouselService.update(id, {
            imagen: newImageUrl,
            link,
        });
        return res.status(200).json({
            message: "Image updated successfully",
            data: updatedCarousel,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
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
            message: "Image deleted successfully",
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.deleteCarouselImage = deleteCarouselImage;
