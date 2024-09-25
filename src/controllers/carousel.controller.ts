import { Request, RequestHandler, Response } from "express";
import { CarouselService } from "../services/carousel.services";
import { CloudinaryService } from "../services/cloudinary.service";

const cloudinaryService = new CloudinaryService();

export const createCarouselImage: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const carouselService = new CarouselService();
  try {
    const { link } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // Subir la imagen a Cloudinary
    const result = await cloudinaryService.uploadImage(file);

    const carousel = await carouselService.create({
      imagen: result.secure_url, // Usar la URL de la imagen en Cloudinary
      link,
    });

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
    const existingImage = await carouselService.find(id);
    const file = req.file;
    const { link } = req.body;

    let newImageUrl = existingImage.imagen; // Mantener la imagen existente

    // Si hay una nueva imagen, subirla a Cloudinary
    if (file) {
      const result = await cloudinaryService.uploadImage(file);
      newImageUrl = result.secure_url; // Actualizar la URL con la nueva imagen
    }

    const updatedCarousel = await carouselService.update(id, {
      imagen: newImageUrl,
      link,
    });

    return res.status(200).json({
      message: "Image updated successfully",
      data: updatedCarousel,
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
