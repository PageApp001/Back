import express from "express";
import db from "./models/index";
import router from "./routes/router";
import { json, urlencoded } from "body-parser";
import "./auth/passport";
import cors from "cors";
import path from "path";

const app = express();

const corsOptions = {
  origin: ["http://localhost:4200", "https://front-xi-ashen.vercel.app"], // Añade los dominios permitidos
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

app.options("*", cors(corsOptions));

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

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use("/api", router);

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

const angularDistPath = path.join(__dirname, "../dist/intranet");
app.use(express.static(angularDistPath));

db.sequelize
  .sync()
  .then(() => {
    app.listen(3000, () => {
      console.log("Se conectó correctamente");
    });
  })
  .catch((e: Error) => {
    console.log("Error al conectar a la base de datos:");
    console.log(e.message);
  });

export default app;
