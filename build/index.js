"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./models/index"));
const router_1 = __importDefault(require("./routes/router"));
const body_parser_1 = require("body-parser");
require("./auth/passport");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use((0, body_parser_1.urlencoded)({
    extended: true
}));
const corsOptions = {
    origin: 'http://localhost:4200',
};
app.use((0, cors_1.default)(corsOptions));
app.use((err, req, res, next) => {
    res.status(500).json({
        message: err.message
    });
});
app.use('/api', router_1.default);
index_1.default.sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log("Se conecto correctamente");
    });
}).catch((e) => {
    console.log("here");
    console.log(e.message);
});
exports.default = app;
