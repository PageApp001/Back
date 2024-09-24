"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/config/multerConfig.ts
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Verificar y crear la carpeta uploads si no existe
const uploadDirectory = path_1.default.join(__dirname, '../../uploads');
if (!fs_1.default.existsSync(uploadDirectory)) {
    fs_1.default.mkdirSync(uploadDirectory, { recursive: true });
}
// Configuración de almacenamiento
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectory); // Carpeta donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.originalname);
        // cb(null, uniqueSuffix + path.extname(file.originalname)); 
    }
});
// Inicializar `multer` con la configuración de almacenamiento
const upload = (0, multer_1.default)({ storage: storage });
exports.default = upload;
