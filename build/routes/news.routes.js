"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const news_controller_1 = require("../controllers/news.controller");
const multer_config_1 = __importDefault(require("../config/multer.config"));
const router = (0, express_1.Router)();
router.post("/news/create", multer_config_1.default.single("imagen"), news_controller_1.createNews);
router.get("/news", news_controller_1.getNews);
router.get("/news/:id", news_controller_1.getNewsById);
router.put("/news/update/:id", multer_config_1.default.single("imagen"), news_controller_1.updateNews);
router.delete("/news/delete/:id", news_controller_1.deleteNews);
exports.default = router;
