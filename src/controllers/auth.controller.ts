import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from 'jsonwebtoken';
import db from "../models";
import bcrypt from 'bcrypt';

export const loginUser: RequestHandler = async (
    req: any,
    res: Response,
    next: NextFunction
) => {
    interface RequestBody {
        email: string,
        password: string
    }
    const { email, password }: RequestBody = req.body;
    if (!email || !password) return res.status(400).json({ "message": "Correo y contraseña son requeridos" });
    const user = await db.User.findOne({
        where: {
            email: email
        }
    }).catch((err: Error) => {
        console.error(err);
    })
    if (!user) {
        return res.status(404).json({
            message: "Verifique nuevamente el correo o la contraseña"
        })
    }
    const match = await bcrypt.compare(password, user.password);
    if (!user || !match) {
        return res.status(401).json({
            message: "Correo o contraseña incorrectos"
        })
    }
    try {
        const accessToken = jwt.sign(
            {
                UserInfo: {
                    id: user.id,
                    email: user.email,
                    nombre: user.nombre,
                    apellido: user.apellido,
                    role: user.role
                }
            },
            "123456",
            {
                expiresIn: "30d"
            })
        const refreshToken = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            "654321",
            {
                expiresIn: "1d"
            }
        );
        res.status(200).json({
            message: "Ingreso exitoso",
            token: accessToken,
            nombre: user.nombre
        })
    } catch (error) {
        res.status(500).json({
            message: "¡Ups! Algo salió mal"
        })
        next(error);
    }
}
export const registerUser: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { nombre, apellido, cargo, dependencia, email, password } = req.body;
    if (!email || !password) return res.status(400).json({ "message": "El correo y la contraseña son requeridos" });
    const exists = await db.User.findOne({
        where: {
            email: req.body.email
        }
    }).catch((err: Error) => {
        console.error(err);
    });
    if (exists) return res.status(409).json({
        message: "El correo ya se encuentra registrado"
    })
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await db.User.create({
            nombre: nombre,
            apellido: apellido,
            cargo: cargo,
            dependencia: dependencia,
            email: email,
            password: hashedPassword
        }).then(() => {
            return res.status(201).json({
                message: "El usuario fue registrado con exito"
            })
        }).then(() => {
        }).catch((err: Error) => {
            console.error(err);
            next(err);
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Ups! Algo salió mal"
        })
        next(error);
    }
}


