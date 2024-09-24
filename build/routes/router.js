"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = __importDefault(require("./user.routes"));
const admin_routes_1 = __importDefault(require("./admin.routes"));
const news_routes_1 = __importDefault(require("./news.routes"));
const carousel_routes_1 = __importDefault(require("./carousel.routes"));
const link_routes_1 = __importDefault(require("./link.routes"));
const birthday_routes_1 = __importDefault(require("./birthday.routes"));
const events_routes_1 = __importDefault(require("./events.routes"));
const router = (0, express_1.Router)();
// User routes
router.use(user_routes_1.default);
//Admin routes
router.use(admin_routes_1.default);
//News routes
router.use(news_routes_1.default);
//Carousel routes
router.use(carousel_routes_1.default);
//Link routes
router.use(link_routes_1.default);
//Birthday routes
router.use(birthday_routes_1.default);
//Event routes
router.use(events_routes_1.default);
exports.default = router;
