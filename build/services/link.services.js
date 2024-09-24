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
exports.LinkService = void 0;
const link_repository_1 = require("../repositories/link.repository");
class LinkService {
    constructor() {
        this.linkRepository = new link_repository_1.LinkRepository;
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const link = yield this.linkRepository.create(data, null);
                return link;
            }
            catch (error) {
                throw error;
            }
        });
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const link = yield this.linkRepository.findAll();
                return link;
            }
            catch (error) {
                throw error;
            }
        });
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const link = yield this.linkRepository.findOne(id);
                return link;
            }
            catch (error) {
                throw error;
            }
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const link = yield this.linkRepository.update(id, data);
                return link;
            }
            catch (error) {
                throw error;
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.linkRepository.delete(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.LinkService = LinkService;
