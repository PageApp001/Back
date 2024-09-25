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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPushNotification = void 0;
const webPush = __importStar(require("web-push"));
webPush.setVapidDetails('mailto:tu-correo@example.com', 'BCxp2qn_2N3JPP9dbgFMAxwclxNiVt5XHAtadIDt4VtGz025nStzS7ho2Jwm09URIzNnkkcNAJomRM_p-WU', '9_vFDbaWTNLcDgLfIA7gfioq0HzKycP5fzon_LVv8mA');
function sendPushNotification(subscription, data) {
    const payload = JSON.stringify({
        title: data.title,
        body: data.body,
        icon: data.icon,
        url: data.url,
    });
    return webPush.sendNotification(subscription, payload)
        .catch((error) => {
        console.error('Error al enviar la notificación push:', error);
    });
}
exports.sendPushNotification = sendPushNotification;
