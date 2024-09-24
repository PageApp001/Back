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
exports.CarouselRepository = void 0;
const models_1 = __importDefault(require("../models"));
class CarouselRepository {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield models_1.default.Carousel.findAll(); // Asegúrate de que 'Carousel' no sea undefined
            }
            catch (error) {
                console.error("Direct error:", error);
                throw new Error("Can't fetch all carousel images.");
            }
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const image = yield models_1.default.Carousel.findByPk(id);
                return image;
            }
            catch (error) {
                throw new Error("Can't find carousel image with id: " + id);
            }
        });
    }
    create(payload, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const image = yield models_1.default.Carousel.create(payload);
                return image;
            }
            catch (error) {
                console.error(error);
                throw new Error(`Error creating carousel image (repository) ${error}`);
            }
        });
    }
    update(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingImage = yield this.findOne(id);
            if (!existingImage) {
                throw new Error('Carousel image not found');
            }
            try {
                const updatedImage = yield models_1.default.Carousel.update(payload, { where: { id } });
                return updatedImage;
            }
            catch (error) {
                throw new Error("Can't update carousel image");
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingImage = yield this.findOne(id);
            if (!existingImage) {
                throw new Error('Carousel image not found');
            }
            try {
                yield models_1.default.Carousel.destroy({ where: { id } });
            }
            catch (error) {
                throw new Error("Can't delete carousel image");
            }
        });
    }
}
exports.CarouselRepository = CarouselRepository;
