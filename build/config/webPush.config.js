"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const web_push_1 = __importDefault(require("web-push"));
const express_1 = require("express");
const router = (0, express_1.Router)();
web_push_1.default.setVapidDetails('mailto:tu-correo@example.com', 'BCxp2qm_2N3JP9dDgFGMA4xzWcvNiP5XAHtadDI4tVGz025nStzSS7ho2JZm0wn09URlZnNxkncAJomRM_P--WU', '9_vFBDaWTWcLd9Lf4IZqfiQt0HzKycP5fzoN_LYv8mA');
exports.default = router;
