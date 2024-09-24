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
exports.EventsService = void 0;
const events_repository_1 = require("../repositories/events.repository");
class EventsService {
    constructor() {
        this.eventsRepository = new events_repository_1.EventsRepository();
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const news = yield this.eventsRepository.create(data, null);
                return news;
            }
            catch (error) {
                throw error;
            }
        });
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const news = yield this.eventsRepository.findAll();
                return news;
            }
            catch (error) {
                throw error;
            }
        });
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const news = yield this.eventsRepository.findOne(id);
                return news;
            }
            catch (error) {
                throw error;
            }
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const news = yield this.eventsRepository.update(id, data);
                return news;
            }
            catch (error) {
                throw error;
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.eventsRepository.delete(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.EventsService = EventsService;
