import { Request, RequestHandler, Response } from "express";
import { CarouselService } from "../services/carousel.services";
export const createCarouselImage: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const carouselService = new CarouselService();
  try {
    const { link } = req.body;
    const imagen = req.file ? req.file.filename : null;
    const carousel = await carouselService.create({ link, imagen });
    if (!imagen) {
      return res.status(400).json({ message: "Image is required" });
    }
    return res.status(201).json({
      message: "Image created successfully",
      data: carousel,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const getCarouselImages: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const carouselService = new CarouselService();
  try {
    const carousel = await carouselService.get();
    return res.status(200).json(carousel);
  } catch (error) {
    console.error("Error fetching carousel images:", error);
    return res
      .status(500)
      .json({ message: "Can't fetch all carousel images." });
  }
};
export const updateCarouselImage: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const carouselService = new CarouselService();
  try {
    // Si no se envía una nueva imagen, conservamos la imagen existente
    const existingImage = await carouselService.find(id);
    const imagen = existingImage.imagen;
    const { link } = req.body;
    const carousel = await carouselService.update(id, { imagen, link });
    return res.status(200).json({
      message: "Image updated successfully",
      data: carousel,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const deleteCarouselImage: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const carouselService = new CarouselService();
  try {
    await carouselService.delete(id);
    return res.status(200).json({
      message: "Image deleted successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
