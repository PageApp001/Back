import { Request, RequestHandler, Response } from "express";
import { QualityService } from "../services/quality.services";

const subscriptions: Array<any> = [];

// Controlador para cargar una estructura de carpetas
// Controlador para cargar una estructura de carpetas
// Controlador para cargar una estructura de carpetas
export const uploadFolderStructure: RequestHandler = async (req: Request, res: Response) => {
  const qualityService = new QualityService();
  try {
    const { folderStructure } = req.body;

    if (!folderStructure) {
      return res.status(400).json({
        message: "La estructura de carpetas es obligatoria.",
      });
    }

    // Llamar al servicio para subir la estructura de carpetas
    await qualityService.uploadFolderStructure(folderStructure);

    return res.status(201).json({
      message: "Estructura de carpetas cargada exitosamente",
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


// Controlador para crear una nueva calidad
export const createQuality: RequestHandler = async (req: Request, res: Response) => {
  const qualityService = new QualityService();
  try {
    const { titulo } = req.body;

    if (!titulo) {
      return res.status(400).json({
        message: "El título es obligatorio.",
      });
    }

    const fechaPublicacion = new Date();
    const quality = await qualityService.create({ titulo, fechaPublicacion });

    return res.status(201).json({
      message: "Calidad creada exitosamente",
      data: quality,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Controlador para obtener todas las calidades
export const getQuality: RequestHandler = async (req: Request, res: Response) => {
  const qualityService = new QualityService();
  try {
    const quality = await qualityService.get();
    return res.status(200).json(quality);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Controlador para obtener una calidad por ID
export const getQualityById: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const qualityService = new QualityService();
  try {
    const quality = await qualityService.find(id);
    return res.status(200).json(quality);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Controlador para actualizar una calidad
export const updateQuality: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const qualityService = new QualityService();
  try {
    const { titulo, fechaPublicacion, file } = req.body;
    const quality = await qualityService.update(id, { titulo, fechaPublicacion, file });

    return res.status(200).json({
      message: "Calidad actualizada exitosamente",
      data: quality,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Controlador para eliminar una calidad
export const deleteQuality: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const qualityService = new QualityService();
  try {
    await qualityService.delete(id);
    return res.status(200).json({
      message: "Calidad eliminada exitosamente",
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Controlador para gestionar suscripciones
export const subscribe: RequestHandler = (req: Request, res: Response) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(201).json({});
};
