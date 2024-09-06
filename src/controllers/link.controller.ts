import { Request, Response, RequestHandler } from "express";
import { LinkService } from "../services/link.services";

export const createLink: RequestHandler = async (req: Request, res: Response) => {
    const linkService = new LinkService();
    try {
        const { nombre, url } = req.body;
        const link = await linkService.create({ nombre, url });
        return res.status(201).json({
            message: "link created succesfully",
            data: link
        })
    } catch (error: any) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const getLink: RequestHandler = async (req: Request, res: Response) => {
    const linkService = new LinkService();
    try {
        const link = await linkService.get();
        return res.status(200).json(link)
    } catch (error) {
        console.error("Error fetching links", error);
        return res.status(500).json({ message: "Can´t fetch all links " })
    }
}

export const getLinkById: RequestHandler = async (req: Request, res: Response) => {
    const { id } = req.params;
    const linkService = new LinkService();
    try {
        const link = await linkService.find(id);
        return res.status(200).json(link)
    } catch (error: any) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const updateLink: RequestHandler = async (req: Request, res: Response) => {
    const { id } = req.params;
    const linkService = new LinkService();
    try {
        const { nombre , url } = req.body;
        const link = await linkService.update(id, { nombre, url});
        return res.status(200).json({
            message: "link updated successfully",
            data: link
        });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message
        });
    }
}


export const deleteLink: RequestHandler = async (req: Request, res: Response) => {
    const { id } = req.params;
    const linkService = new LinkService();
    try {
        await linkService.delete(id)
        return res.status(200).json({
            message: "link delete successfully"
        });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message
        })
    }
}

