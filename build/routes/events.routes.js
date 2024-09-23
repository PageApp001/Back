"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const events_controller_1 = require("../controllers/events.controller");
const router = (0, express_1.Router)();
router.post("/event/create", events_controller_1.createEvent);
router.get("/event", events_controller_1.getEvents);
router.get("/event/:id", events_controller_1.getEventsById);
router.put("/event/update/:id", events_controller_1.updateEvents);
router.delete("/event/delete/:id", events_controller_1.deleteEvent);
exports.default = router;
