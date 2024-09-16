import { Request, RequestHandler, Response } from "express";
import { NewsService } from "../services/news.services";
import webPush from "../config/webPush.config";

const subscriptions: Array<any> = [];

export const createNews: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const newsService = new NewsService();
  try {
    const { titulo, descripcion } = req.body;
    const imagen = req.file ? req.file.filename : null;
    const fechaPublicacion = new Date();
    const news = await newsService.create({
      titulo,
      descripcion,
      imagen,
      fechaPublicacion,
    });

    // Enviar notificación push a todos los suscriptores
    const notificationPayload = JSON.stringify({
      title: "Nueva publicación creada",
      body: titulo,
      icon: "assets/icons/icon-72x72.png",
    });

    subscriptions.forEach((subscription) => {
      webPush
        .sendNotification(subscription, notificationPayload)
        .catch((error) => {
          console.error("Error al enviar notificación: ", error);
        });
    });
    //-------------------------------------------------
    return res.status(201).json({
      message: "News created successfully",
      data: news,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getNews: RequestHandler = async (req: Request, res: Response) => {
  const newsService = new NewsService();
  try {
    const news = await newsService.get();
    return res.status(200).json(news);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getNewsById: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const newsService = new NewsService();
  try {
    const news = await newsService.find(id);
    return res.status(200).json(news);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateNews: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const newsService = new NewsService();
  try {
    const { titulo, descripcion, fechaPublicacion } = req.body;
    const imagen = req.file ? req.file.filename : req.body.imagen;
    const news = await newsService.update(id, {
      titulo,
      descripcion,
      imagen,
      fechaPublicacion,
    });
    return res.status(200).json({
      message: "News updated successfully",
      data: news,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteNews: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const newsService = new NewsService();
  try {
    await newsService.delete(id);
    return res.status(200).json({
      message: "News deleted successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const subscribe: RequestHandler = (req: Request, res: Response) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(201).json({});
};
