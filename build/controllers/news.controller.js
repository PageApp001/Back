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
exports.subscribe = exports.deleteNews = exports.updateNews = exports.getNewsById = exports.getNews = exports.createNews = void 0;
const news_services_1 = require("../services/news.services");
const cloudinary_service_1 = require("../services/cloudinary.service");
const subscriptions = [];
const cloudinaryService = new cloudinary_service_1.CloudinaryService();
const createNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newsService = new news_services_1.NewsService();
    try {
        const { titulo, descripcion } = req.body;
        const file = req.file;
        const fechaPublicacion = new Date();
        if (!file) {
            return res.status(400).json({ message: "Image is required" });
        }
        // Subir la imagen a Cloudinary
        const result = yield cloudinaryService.uploadImage(file);
        // Crear la noticia con la URL de la imagen de Cloudinary
        const news = yield newsService.create({
            titulo,
            descripcion,
            imagen: result.secure_url, // Usar la URL de la imagen en Cloudinary
            fechaPublicacion,
        });
        return res.status(201).json({
            message: "News created successfully",
            data: news,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.createNews = createNews;
const getNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newsService = new news_services_1.NewsService();
    try {
        const news = yield newsService.get();
        return res.status(200).json(news);
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.getNews = getNews;
const getNewsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const newsService = new news_services_1.NewsService();
    try {
        const news = yield newsService.find(id);
        return res.status(200).json(news);
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.getNewsById = getNewsById;
const updateNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const newsService = new news_services_1.NewsService();
    try {
        const { titulo, descripcion, fechaPublicacion } = req.body;
        let imagen = req.body.imagen; // Mantener la URL existente de la imagen
        const file = req.file; // Nueva imagen, si se sube
        // Si hay una nueva imagen, subirla a Cloudinary
        if (file) {
            const result = yield cloudinaryService.uploadImage(file);
            imagen = result.secure_url; // Actualizar la imagen con la URL de Cloudinary
        }
        const news = yield newsService.update(id, {
            titulo,
            descripcion,
            imagen,
            fechaPublicacion,
        });
        return res.status(200).json({
            message: "News updated successfully",
            data: news,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.updateNews = updateNews;
const deleteNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const newsService = new news_services_1.NewsService();
    try {
        yield newsService.delete(id);
        return res.status(200).json({
            message: "News deleted successfully",
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.deleteNews = deleteNews;
const subscribe = (req, res) => {
    const subscription = req.body;
    subscriptions.push(subscription);
    res.status(201).json({});
};
exports.subscribe = subscribe;
