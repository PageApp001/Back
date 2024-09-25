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
exports.SubscriptionRepository = void 0;
const models_1 = __importDefault(require("../models"));
class SubscriptionRepository {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subscription = yield models_1.default.Subscription.findAll();
                return subscription;
            }
            catch (error) {
                throw new Error("Can't fetch all news.");
            }
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subscription = yield models_1.default.Subscription.findByPk(id);
                return subscription;
            }
            catch (error) {
                throw new Error("Can't find Subscription with id: " + id);
            }
        });
    }
    create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subscription = yield models_1.default.Subscription.create(payload);
                return subscription;
            }
            catch (error) {
                console.error(error);
                throw new Error(`Error creating Subscription (repository) ${error}`);
            }
        });
    }
    update(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingSubscription = yield this.findOne(id);
            if (!existingSubscription) {
                throw new Error('News not found');
            }
            try {
                const updatedSubscription = yield models_1.default.Subscription.update(payload, { where: { id } });
                return updatedSubscription;
            }
            catch (error) {
                throw new Error("Can't update Subscription");
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingSubscription = yield this.findOne(id);
            if (!existingSubscription) {
                throw new Error('News not found');
            }
            try {
                yield models_1.default.Subscription.destroy({ where: { id } });
            }
            catch (error) {
                throw new Error("Can't delete Subscription");
            }
        });
    }
}
exports.SubscriptionRepository = SubscriptionRepository;
