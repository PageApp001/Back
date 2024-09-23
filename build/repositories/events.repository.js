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
exports.EventsRepository = void 0;
const models_1 = __importDefault(require("../models"));
class EventsRepository {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const event = yield models_1.default.Events.findAll();
                return event;
            }
            catch (error) {
                throw new Error("Can't fetch all events");
            }
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const event = yield models_1.default.Events.findByPk(id);
                return event;
            }
            catch (error) {
                throw new Error("Can't find event with id: " + id);
            }
        });
    }
    create(payload, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const event = yield models_1.default.Events.create(payload);
                return event;
            }
            catch (error) {
                console.log(error);
                throw new Error(`Error creating event (repository) ${error}`);
            }
        });
    }
    update(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingEvent = yield this.findOne(id);
            if (!existingEvent) {
                throw new Error('Event not found');
            }
            try {
                const updateEvents = yield models_1.default.Events.update(payload, { where: { id } });
                return updateEvents;
            }
            catch (error) {
                throw new Error("Can't update event");
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingEvent = yield this.findOne(id);
            if (!existingEvent) {
                throw new Error('Event not found');
            }
            try {
                yield models_1.default.Events.destroy({ where: { id } });
            }
            catch (error) {
                throw new Error("Can't delete event");
            }
        });
    }
}
exports.EventsRepository = EventsRepository;
