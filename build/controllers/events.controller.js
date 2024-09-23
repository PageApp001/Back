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
exports.deleteEvent = exports.updateEvents = exports.getEventsById = exports.getEvents = exports.createEvent = void 0;
const events_services_1 = require("../services/events.services");
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eventsService = new events_services_1.EventsService();
    try {
        const { nombre, descripcion, fechaInicio, horaInicio } = req.body;
        const fechaPublicacion = new Date();
        const event = yield eventsService.create({
            nombre,
            descripcion,
            fechaInicio: new Date(fechaInicio),
            horaInicio,
            fechaPublicacion,
        });
        return res.status(201).json({
            message: "Event create successfully",
            data: event,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.createEvent = createEvent;
const getEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eventService = new events_services_1.EventsService();
    try {
        const event = yield eventService.get();
        return res.status(200).json({
            event,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.getEvents = getEvents;
const getEventsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const eventService = new events_services_1.EventsService();
    try {
        const event = yield eventService.find(id);
        return res.status(200).json(event);
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.getEventsById = getEventsById;
const updateEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const eventService = new events_services_1.EventsService();
    try {
        const { nombre, descripcion, fechaInicio, horaInicio, fechaPublicacion } = req.body;
        const event = yield eventService.update(id, {
            nombre,
            descripcion,
            fechaInicio,
            horaInicio,
            fechaPublicacion,
        });
        return res.status(200).json({
            message: "Event update successfully",
            data: event,
        });
    }
    catch (error) {
        return res.status(500).json({
            messsage: error.message,
        });
    }
});
exports.updateEvents = updateEvents;
const deleteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const eventService = new events_services_1.EventsService();
    try {
        yield eventService.delete(id);
        return res.status(200).json({
            message: "Event delete successfully",
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.deleteEvent = deleteEvent;
