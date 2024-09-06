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
exports.registerUser = exports.loginUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = __importDefault(require("../models"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ "message": "Correo y contraseña son requeridos" });
    const user = yield models_1.default.User.findOne({
        where: {
            email: email
        }
    }).catch((err) => {
        console.error(err);
    });
    if (!user) {
        return res.status(404).json({
            message: "Verifique nuevamente el correo o la contraseña"
        });
    }
    const match = yield bcrypt_1.default.compare(password, user.password);
    if (!user || !match) {
        return res.status(401).json({
            message: "Correo o contraseña incorrectos"
        });
    }
    try {
        const accessToken = jsonwebtoken_1.default.sign({
            UserInfo: {
                id: user.id,
                email: user.email,
                nombre: user.nombre,
                apellido: user.apellido,
                role: user.role
            }
        }, "123456", {
            expiresIn: "30d"
        });
        const refreshToken = jsonwebtoken_1.default.sign({
            id: user.id,
            email: user.email
        }, "654321", {
            expiresIn: "1d"
        });
        res.status(200).json({
            message: "Ingreso exitoso",
            token: accessToken,
            nombre: user.nombre
        });
    }
    catch (error) {
        res.status(500).json({
            message: "¡Ups! Algo salió mal"
        });
        next(error);
    }
});
exports.loginUser = loginUser;
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, apellido, cargo, dependencia, email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ "message": "El correo y la contraseña son requeridos" });
    const exists = yield models_1.default.User.findOne({
        where: {
            email: req.body.email
        }
    }).catch((err) => {
        console.error(err);
    });
    if (exists)
        return res.status(409).json({
            message: "El correo ya se encuentra registrado"
        });
    try {
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield models_1.default.User.create({
            nombre: nombre,
            apellido: apellido,
            cargo: cargo,
            dependencia: dependencia,
            email: email,
            password: hashedPassword
        }).then(() => {
            return res.status(201).json({
                message: "El usuario fue registrado con exito"
            });
        }).then(() => {
        }).catch((err) => {
            console.error(err);
            next(err);
        });
    }
    catch (error) {
        res.status(500).json({
            message: "¡Ups! Algo salió mal"
        });
        next(error);
    }
});
exports.registerUser = registerUser;
