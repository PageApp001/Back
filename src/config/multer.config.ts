// src/config/multerConfig.ts
import multer from "multer";
import path from "path";
import fs from "fs";
// Verificar y crear la carpeta uploads si no existe
const uploadDirectory = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}
// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory); // Carpeta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.originalname);
    // cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
// Inicializar `multer` con la configuración de almacenamiento
const upload = multer({ storage: storage });
export default upload;
