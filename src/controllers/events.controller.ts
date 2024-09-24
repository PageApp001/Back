import { Request, RequestHandler, Response } from "express";
import { EventsService } from "../services/events.services";

export const createEvent: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const eventsService = new EventsService();
  try {
    const { nombre, descripcion, fechaInicio, horaInicio } = req.body;
    const fechaPublicacion = new Date();

    const event = await eventsService.create({
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
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getEvents: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const eventService = new EventsService();
  try {
    const event = await eventService.get();
    return res.status(200).json({
      event,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getEventsById: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const eventService = new EventsService();
  try {
    const event = await eventService.find(id);
    return res.status(200).json(event);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateEvents: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const eventService = new EventsService();
  try {
    const { nombre, descripcion, fechaInicio, horaInicio, fechaPublicacion } =
      req.body;
    const event = await eventService.update(id, {
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
  } catch (error: any) {
    return res.status(500).json({
      messsage: error.message,
    });
  }
};

export const deleteEvent: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const eventService = new EventsService();
  try {
    await eventService.delete(id);
    return res.status(200).json({
      message: "Event delete successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
