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
exports.BirthdayRepository = void 0;
const models_1 = __importDefault(require("../models"));
class BirthdayRepository {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield models_1.default.Birthday.findAll();
            }
            catch (error) {
                console.error("Direct error:", error);
                throw new Error("Can't fetch all images.");
            }
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const image = yield models_1.default.Birthday.findByPk(id);
                return image;
            }
            catch (error) {
                throw new Error("Can't find image with id: " + id);
            }
        });
    }
    create(payload, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const image = yield models_1.default.Birthday.create(payload);
                return image;
            }
            catch (error) {
                console.error(error);
                throw new Error(`Error creating image (repository) ${error}`);
            }
        });
    }
    update(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingImage = yield this.findOne(id);
            if (!existingImage) {
                throw new Error('image not found');
            }
            try {
                const updatedImage = yield models_1.default.Birthday.update(payload, { where: { id } });
                return updatedImage;
            }
            catch (error) {
                throw new Error("Can't update image");
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingImage = yield this.findOne(id);
            if (!existingImage) {
                throw new Error('image not found');
            }
            try {
                yield models_1.default.Birthday.destroy({ where: { id } });
            }
            catch (error) {
                throw new Error("Can't delete image");
            }
        });
    }
}
exports.BirthdayRepository = BirthdayRepository;
