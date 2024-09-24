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
exports.CarouselService = void 0;
const carousel_repository_1 = require("../repositories/carousel.repository");
class CarouselService {
    constructor() {
        this.carouselRepository = new carousel_repository_1.CarouselRepository();
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const image = yield this.carouselRepository.create(data, null);
                return image;
            }
            catch (error) {
                throw error;
            }
        });
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const images = yield this.carouselRepository.findAll();
                return images;
            }
            catch (error) {
                throw error;
            }
        });
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const image = yield this.carouselRepository.findOne(id);
                return image;
            }
            catch (error) {
                throw error;
            }
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const image = yield this.carouselRepository.update(id, data);
                return image;
            }
            catch (error) {
                throw error;
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.carouselRepository.delete(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.CarouselService = CarouselService;
