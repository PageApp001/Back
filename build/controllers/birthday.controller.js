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
exports.deleteBirthdayImage = exports.getBirthdayImages = exports.createBirthdaylImage = void 0;
const birthday_services_1 = require("../services/birthday.services");
const createBirthdaylImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const birthdayService = new birthday_services_1.BirthdayService();
    try {
        const imagen = req.file ? req.file.filename : null;
        const birthday = yield birthdayService.create({ imagen });
        if (!imagen) {
            return res.status(400).json({ message: "Image is required" });
        }
        return res.status(201).json({
            message: "Image created successfully",
            data: birthday,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.createBirthdaylImage = createBirthdaylImage;
const getBirthdayImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const birthdayService = new birthday_services_1.BirthdayService();
    try {
        const birthday = yield birthdayService.get();
        return res.status(200).json(birthday);
    }
    catch (error) {
        console.error("Error fetching carousel images:", error);
        return res
            .status(500)
            .json({ message: "Can't fetch all carousel images." });
    }
});
exports.getBirthdayImages = getBirthdayImages;
const deleteBirthdayImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const birthdayService = new birthday_services_1.BirthdayService();
    try {
        yield birthdayService.delete(id);
        return res.status(200).json({
            message: "Image deleted successfully",
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.deleteBirthdayImage = deleteBirthdayImage;
