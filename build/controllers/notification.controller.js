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
exports.subscribe = void 0;
// Ruta para manejar la suscripción
function subscribe(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const SubscriptionAttributes = req.body;
        try {
            // Guardar la suscripción en la base de datos usando Sequelize
            const newSubscription = yield SubscriptionAttributes.create({
                endpoint: SubscriptionAttributes.endpoint,
                keys: JSON.stringify(SubscriptionAttributes.keys) // Aseguramos que 'keys' se almacene como string en la DB
            });
            res.status(201).json({ message: 'Suscripción guardada exitosamente', data: newSubscription });
        }
        catch (error) {
            console.error('Error al guardar la suscripción:', error);
            res.status(500).json({ error: 'Ocurrió un error al guardar la suscripción' });
        }
    });
}
exports.subscribe = subscribe;
