"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notification_controller_1 = require("../controllers/notification.controller");
const router = (0, express_1.Router)();
router.post('/subscribe', notification_controller_1.subscribe);
exports.default = router;
