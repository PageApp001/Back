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
exports.LinkRepository = void 0;
const models_1 = __importDefault(require("../models"));
class LinkRepository {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const link = yield models_1.default.Link.findAll();
                return link;
            }
            catch (error) {
                throw new Error("Can't fetch all links.");
            }
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const link = yield models_1.default.Link.findByPk(id);
                return link;
            }
            catch (error) {
                throw new Error("Can't find link with id: " + id);
            }
        });
    }
    create(payload, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const link = yield models_1.default.Link.create(payload);
                return link;
            }
            catch (error) {
                console.log(error);
                throw new Error(`Error creating link (repository) ${error}`);
            }
        });
    }
    update(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingLink = yield this.findOne(id);
            if (!existingLink) {
                throw new Error('Link not found');
            }
            try {
                const updateLink = yield models_1.default.Link.update(payload, { where: { id } });
                return updateLink;
            }
            catch (error) {
                throw new Error('Can´t update link ');
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingLink = yield this.findOne(id);
            if (!existingLink) {
                throw new Error('Link not found');
            }
            try {
                yield models_1.default.Link.destroy({ where: { id } });
            }
            catch (error) {
                throw new Error('Can´t delete link ');
            }
        });
    }
}
exports.LinkRepository = LinkRepository;
