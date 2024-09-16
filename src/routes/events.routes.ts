import { Router } from "express";
import {
  createEvent,
  deleteEvent,
  getEvents,
  getEventsById,
  updateEvents,
} from "../controllers/events.controller";

const router = Router();

router.post("/event/create", createEvent);
router.get("/event", getEvents);
router.get("/event/:id", getEventsById);
router.put("/event/update/:id", updateEvents);
router.delete("/event/delete/:id", deleteEvent);

export default router;
