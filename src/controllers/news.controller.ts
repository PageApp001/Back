import { Request, RequestHandler, Response } from "express";
import { NewsService } from "../services/news.services";
import { CloudinaryService } from "../services/cloudinary.service";

const subscriptions: Array<any> = [];

const cloudinaryService = new CloudinaryService();

export const createNews: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const newsService = new NewsService();
  try {
    const { titulo, descripcion } = req.body;
    const file = req.file;
    const fechaPublicacion = new Date();

    if (!file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // Subir la imagen a Cloudinary
    const result = await cloudinaryService.uploadImage(file);

    // Crear la noticia con la URL de la imagen de Cloudinary
    const news = await newsService.create({
      titulo,
      descripcion,
      imagen: result.secure_url, // Usar la URL de la imagen en Cloudinary
      fechaPublicacion,
    });

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

export const updateNews: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const newsService = new NewsService();
  try {
    const { titulo, descripcion, fechaPublicacion } = req.body;
    let imagen = req.body.imagen; // Mantener la URL existente de la imagen
    const file = req.file; // Nueva imagen, si se sube

    // Si hay una nueva imagen, subirla a Cloudinary
    if (file) {
      const result = await cloudinaryService.uploadImage(file);
      imagen = result.secure_url; // Actualizar la imagen con la URL de Cloudinary
    }

    
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
