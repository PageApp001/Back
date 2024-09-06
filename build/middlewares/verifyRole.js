"use strict";
// import { Response, Request, NextFunction } from "express";
// // Middleware de autorización para verificar el rol del usuario
// export const isAdmin = (
//     req: any,
//     res: Response,
//     next: NextFunction) => {
//     if (req.user && req.user.role === 'admin') {
//         next(); // Permitir el acceso si el usuario tiene el rol de administrador
//     } else {
//         res.status(403).json({ message: 'Unauthorized' }); // Devolver un error de acceso no autorizado
//     }
// };
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAdmin = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; // Obtener el token del encabezado de autorización
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, '123456');
        if (decodedToken.UserInfo.role === 'admin') {
            next();
        }
        else {
            return res.status(403).json({ message: 'Require Admin Role!' });
        }
    }
    catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};
exports.isAdmin = isAdmin;
