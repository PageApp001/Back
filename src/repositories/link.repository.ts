import { LinkAttributes } from "../models/link";
import ILinkRepository from "./interfaces/link.repository.interface";
import db from '../models'

export class LinkRepository implements ILinkRepository<LinkAttributes , number> {
    async findAll(): Promise <LinkAttributes[]> {
        try {
            const link = await db.Link.findAll();
            return link
        } catch (error) {
            throw new Error("Can't fetch all links.");
        }
    }

    async findOne(id: number): Promise<LinkAttributes> {
        try {
            const link = await db.Link.findByPk(id);
            return link
        } catch (error) {
            throw new Error("Can't find link with id: " + id);
        }
    }

    async create(payload: any, callback: any): Promise<LinkAttributes> {
        try {
            const link = await db.Link.create(payload);
            return link
        } catch (error) {
            console.log(error);
            throw new Error (`Error creating link (repository) ${error}`)
        }
    }

    async update(id: number, payload: any): Promise<LinkAttributes> {
        const existingLink = await this.findOne(id);
        if(!existingLink){
            throw new Error('Link not found')
        }
        try {
            const updateLink = await db.Link.update(payload , {where:{id} });
            return updateLink
        } catch (error) {
            throw new Error ('Can´t update link ')
        }
    }

    async delete(id: number): Promise<void> {
        const existingLink = await this.findOne (id)
        if (!existingLink) {
            throw new Error ('Link not found')
        }
        try {
            await db.Link.destroy({where: {id} })
        } catch (error) {
            throw new Error ('Can´t delete link ')
        }
    }
}