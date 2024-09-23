import { Request, RequestHandler, Response } from "express";
import { BirthdayService } from "../services/birthday.services";

export const createBirthdaylImage: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const birthdayService = new BirthdayService();
  try {
    const imagen = req.file ? req.file.filename : null;
    const birthday = await birthdayService.create({ imagen });
    if (!imagen) {
      return res.status(400).json({ message: "Image is required" });
    }

    return res.status(201).json({
      message: "Image created successfully",
      data: birthday,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getBirthdayImages: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const birthdayService = new BirthdayService();
  try {
    const birthday = await birthdayService.get();
    return res.status(200).json(birthday);
  } catch (error) {
    console.error("Error fetching carousel images:", error);
    return res
      .status(500)
      .json({ message: "Can't fetch all carousel images." });
  }
};

export const deleteBirthdayImage: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const birthdayService = new BirthdayService();
  try {
    await birthdayService.delete(id);
    return res.status(200).json({
      message: "Image deleted successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
