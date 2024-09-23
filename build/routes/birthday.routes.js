"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const birthday_controller_1 = require("../controllers/birthday.controller");
const multer_config_1 = __importDefault(require("../config/multer.config"));
const router = (0, express_1.Router)();
router.post("/birthday/create", multer_config_1.default.single("image"), birthday_controller_1.createBirthdaylImage);
router.get("/birthday", birthday_controller_1.getBirthdayImages);
router.delete("/birthday/delete/:id", birthday_controller_1.deleteBirthdayImage);
exports.default = router;
