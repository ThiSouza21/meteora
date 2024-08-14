"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
(0, routes_1.router)(app);
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
}));
app.listen(3000, () => {
    console.log("O Server foi aberto na porta http://localhost:3000");
});
