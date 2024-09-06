import { LinkAttributes } from "../models/link";
import { LinkRepository } from "../repositories/link.repository";

export class LinkService {
    private linkRepository: LinkRepository;

    constructor(){
        this.linkRepository = new LinkRepository
    }

    async create (data: LinkAttributes):Promise<LinkAttributes>{
        try {
            const link : LinkAttributes = await this.linkRepository.create(data, null);
            return link
        } catch (error) {
            throw error
        }
    }

    async get():Promise <LinkAttributes[]>{
        try {
            const link : LinkAttributes[] = await this.linkRepository.findAll();
            return link;
        } catch (error) {
            throw error;
        }
    }
    
    async find (id:any): Promise<LinkAttributes>{
        try {
            const link: LinkAttributes = await this.linkRepository.findOne(id);
            return link
        } catch (error) {
            throw error;
        }
    }

    async update (id:any , data : LinkAttributes):Promise <LinkAttributes>{
        try {
            const link : LinkAttributes = await this.linkRepository.update(id,data);
            return link
        } catch (error) {
            throw error;
        }
    }

    async delete (id:any):Promise<void>{
        try {
            await this.linkRepository.delete(id)
        } catch (error) {
            throw error;
        }
    }

}