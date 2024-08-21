"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const usuarios_1 = __importDefault(require("./usuarios"));
const auth_1 = __importDefault(require("./auth"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const router = (app) => {
    app.use(express_1.default.json(), (0, cookie_parser_1.default)(), (0, cors_1.default)({
        origin: "http://localhost:5173",
        credentials: true,
        methods: "GET,PUT,POST,OPTIONS,DELETE",
        allowedHeaders: "Access-Control-Allow-Headers,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization",
    }));
    app.use(auth_1.default, usuarios_1.default);
};
exports.router = router;
