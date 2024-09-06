"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = __importDefault(require("./user.routes"));
const admin_routes_1 = __importDefault(require("./admin.routes"));
const news_routes_1 = __importDefault(require("./news.routes"));
const router = (0, express_1.Router)();
// User routes
router.use(user_routes_1.default);
//Admin routes
router.use(admin_routes_1.default);
//News routes
router.use(news_routes_1.default);
exports.default = router;
