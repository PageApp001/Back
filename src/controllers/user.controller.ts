import { NextFunction, Request, RequestHandler, Response } from "express";
import { UserService } from "../services/user.services";


export const createUser: RequestHandler = async (
    req: Request,
    res: Response,
) => {
    const userService = new UserService();
    try {
        console.log(req.body)
        const user = await userService.create({ ...req.body });
        return res.status(201).json(
            {
                message: "User created succesfully",
                data: user
            }
        )
    } catch (error: any) {
        return res.status(500).json({
            message: error.message
        })
    }
}
export const getUsers: RequestHandler = async (
    req: Request,
    res: Response
) => {
    const userService = new UserService();
    try {
        const users = await userService.get();
        return res.status(200).json(
            users
        )
    } catch (error: any) {
        return res.status(500).json({
            message: error.message
        })
    }
}
export const getUserById: RequestHandler = async (
    req: Request,
    res: Response
) => {
    const { email } = req.params;
    const userService = new UserService();
    try {
        const user = await userService.find(email);
        return res.status(200).json({
            user
        })
    } catch (error: any) {
        return res.status(500).json({
            message: error.message
        })
    }
}
export const updateUser: RequestHandler = async (
    req: Request,
    res: Response
) => {
    const { email } = req.params;
    const userService = new UserService();
    try {
        const user = await userService.update(email, req.body);
        return res.status(200).json({
            message: "User updated succesfully",
            statuscode: user
        })
    } catch (error: any) {
        return res.status(500).json({
            message: error.message
        })
    }
}
export const deleteUser: RequestHandler = async (
    req: Request,
    res: Response
) => {
    const { email } = req.params;
    const userService = new UserService();
    try {
        const user = await userService.delete(email);
        return res.status(200).json({
            message: "User deleted succesfully",
            statuscode: user
        })
    } catch (error: any) {
        return res.status(500).json({
            message: error.message
        })
    }
}