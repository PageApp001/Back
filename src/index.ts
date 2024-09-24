import express from "express";
import db from "./models/index";
import router from "./routes/router";
import { json, urlencoded } from "body-parser";
import "./auth/passport";
import cors from "cors";
import path from "path";

const app = express();

const corsOptions = {
  origin: "*", // Permitir todas las solicitudes desde cualquier origen
};
app.use(cors(corsOptions));

app.use(json());
app.use(
  urlencoded({
    extended: true,
  })
);

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(500).json({
      message: err.message,
    });
  }
);

app.use("/api", router);

// Servir archivos estáticos desde la carpeta uploads.
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

const angularDistPath = path.join(__dirname, "../dist/intranet");
app.use(express.static(angularDistPath));

// servidor
db.sequelize
  .sync()
  .then(() => {
    app.listen(3000, () => {
      console.log("Se conecto correctamente");
    });
  })
  .catch((e: Error) => {
    console.log("here");

    console.log(e.message);
  });

export default app;
