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
exports.deleteNews = exports.updateNews = exports.getNewsById = exports.getNews = exports.createNews = void 0;
const news_services_1 = require("../services/news.services");
const createNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newsService = new news_services_1.NewsService();
    try {
        console.log(req.body);
        const { titulo, descripcion, fechaPublicacion, activo } = req.body;
        const imagen = req.file ? req.file.filename : null;
        const news = yield newsService.create({ titulo, descripcion, imagen, fechaPublicacion, activo });
        return res.status(201).json({
            message: "News created successfully",
            data: news
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message
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
            message: error.message
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
            message: error.message
        });
    }
});
exports.getNewsById = getNewsById;
const updateNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const newsService = new news_services_1.NewsService();
    try {
        const { titulo, descripcion, fechaPublicacion, activo } = req.body;
        const imagen = req.file ? req.file.filename : req.body.imagen;
        const news = yield newsService.update(id, { titulo, descripcion, imagen, fechaPublicacion, activo });
        return res.status(200).json({
            message: "News updated successfully",
            data: news
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message
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
            message: "News deleted successfully"
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});
exports.deleteNews = deleteNews;
