"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.sendPushNotification = void 0;
const webPush = __importStar(require("web-push"));
const user_repository_1 = require("../repositories/user.repository");
const subscription_1 = __importDefault(require("../models/subscription"));
webPush.setVapidDetails('mailto:tu-correo@example.com', 'BCxp2qn_2N3JPP9dbgFMAxwclxNiVt5XHAtadIDt4VtGz025nStzS7ho2Jwm09URIzNnkkcNAJomRM_p-WU', '9_vFDbaWTNLcDgLfIA7gfioq0HzKycP5fzon_LVv8mA');
function sendPushNotification(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const userRepository = new user_repository_1.UserRepository();
        // Obtén todos los usuarios junto con sus suscripciones
        const users = yield userRepository.findAll({
            include: {
                model: subscription_1.default,
                required: true,
            },
        });
        if (!users || users.length === 0) {
            throw new Error('No hay usuarios disponibles para la notificación');
        }
        const sendNotifications = users.map((user) => __awaiter(this, void 0, void 0, function* () {
            const subscription = user.Subscription; // Accede a la suscripción del usuario
            if (!subscription) {
                console.warn(`El usuario ${user.firstName} ${user.lastName} no tiene una suscripción para notificaciones push.`);
                return;
            }
            const payload = JSON.stringify({
                title: data.title,
                body: data.body,
                icon: data.icon,
                url: data.url,
            });
            return webPush.sendNotification(subscription, payload).catch((error) => {
                console.error(`Error al enviar la notificación push al usuario ${user.firstName} ${user.lastName}:`, error);
            });
        }));
        yield Promise.all(sendNotifications);
        console.log('Notificaciones enviadas a todos los usuarios');
    });
}
exports.sendPushNotification = sendPushNotification;
