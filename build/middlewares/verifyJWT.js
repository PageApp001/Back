"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    console.log("HEADER:", authHeader);
    if (!(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith('Bearer ')))
        return res.sendStatus(401);
    const token = authHeader.split(" ")[1];
    console.log("TOKEN: ", token);
    jsonwebtoken_1.default.verify(token, "123456", (err, decoded) => {
        if (err)
            return res.status(403).json({
                message: err
            });
        req.email = decoded.UserInfo.email;
        next();
    });
};
exports.verifyJWT = verifyJWT;
