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
exports.deleteLink = exports.updateLink = exports.getLinkById = exports.getLink = exports.createLink = void 0;
const link_services_1 = require("../services/link.services");
const createLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const linkService = new link_services_1.LinkService();
    try {
        const { nombre, url } = req.body;
        const link = yield linkService.create({ nombre, url });
        return res.status(201).json({
            message: "link created succesfully",
            data: link
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});
exports.createLink = createLink;
const getLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const linkService = new link_services_1.LinkService();
    try {
        const link = yield linkService.get();
        return res.status(200).json(link);
    }
    catch (error) {
        console.error("Error fetching links", error);
        return res.status(500).json({ message: "Can´t fetch all links " });
    }
});
exports.getLink = getLink;
const getLinkById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const linkService = new link_services_1.LinkService();
    try {
        const link = yield linkService.find(id);
        return res.status(200).json(link);
    }
    catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});
exports.getLinkById = getLinkById;
const updateLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const linkService = new link_services_1.LinkService();
    try {
        const { nombre, url } = req.body;
        const link = yield linkService.update(id, { nombre, url });
        return res.status(200).json({
            message: "link updated successfully",
            data: link
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});
exports.updateLink = updateLink;
const deleteLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const linkService = new link_services_1.LinkService();
    try {
        yield linkService.delete(id);
        return res.status(200).json({
            message: "link delete successfully"
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});
exports.deleteLink = deleteLink;
