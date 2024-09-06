import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]; // Obtener el token del encabezado de autorización

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    try {
        const decodedToken: any = jwt.verify(token, '123456');

        if (decodedToken.UserInfo.role === 'admin') {
            next();
        } else {
            return res.status(403).json({ message: 'Require Admin Role!' });
        }
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};
