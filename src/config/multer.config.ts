import multer from 'multer';

// Almacena los archivos en la memoria (buffer)
const storage = multer.memoryStorage();

// Middleware de multer que se encargará de procesar la imagen
export const upload = multer({ storage });
