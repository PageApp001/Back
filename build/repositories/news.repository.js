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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsRepository = void 0;
const models_1 = __importDefault(require("../models"));
class NewsRepository {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const news = yield models_1.default.News.findAll();
                return news;
            }
            catch (error) {
                throw new Error("Can't fetch all news.");
            }
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const news = yield models_1.default.News.findByPk(id);
                return news;
            }
            catch (error) {
                throw new Error("Can't find news with id: " + id);
            }
        });
    }
    create(payload, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const news = yield models_1.default.News.create(payload);
                return news;
            }
            catch (error) {
                console.error(error);
                throw new Error(`Error creating news (repository) ${error}`);
            }
        });
    }
    update(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingNews = yield this.findOne(id);
            if (!existingNews) {
                throw new Error('News not found');
            }
            try {
                const updatedNews = yield models_1.default.News.update(payload, { where: { id } });
                return updatedNews;
            }
            catch (error) {
                throw new Error("Can't update news");
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingNews = yield this.findOne(id);
            if (!existingNews) {
                throw new Error('News not found');
            }
            try {
                yield models_1.default.News.destroy({ where: { id } });
            }
            catch (error) {
                throw new Error("Can't delete news");
            }
        });
    }
}
exports.NewsRepository = NewsRepository;
