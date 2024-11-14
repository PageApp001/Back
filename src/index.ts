import express from "express";
import db from "./models/index";
import router from "./routes/router";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import path from "path";
import notificationRoutes from './routes/notification.routes';
import qualityRoutes from './routes/quality.routes';

const app = express();

// Configuración de CORS
const corsOptions = {
    origin: "http://localhost:4200",  // Cambiar a HTTPS
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// Middleware
app.use(json());
app.use(urlencoded({ extended: true }));

// Rutas
app.use("/api", router);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/notifications", notificationRoutes);
app.use("/quality", qualityRoutes);

// Manejo de errores
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(500).json({ message: err.message });
});

// Inicialización del servidor
db.sequelize
    .sync()
    .then(() => {
        app.listen(3000, '0.0.0.0', () => {
            console.log("Servidor HTTPS corriendo en http://192.168.100.42:3000");
        });
    })
    .catch((e: Error) => {
        console.log("Error al conectar:");
        console.log(e.message);
    });

export default app;
