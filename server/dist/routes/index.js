"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const usuarios_1 = __importDefault(require("./usuarios"));
const auth_1 = __importDefault(require("./auth"));
const cors_1 = __importDefault(require("cors"));
const router = (app) => {
    app.use(express_1.default.json(), (0, cors_1.default)(), auth_1.default, usuarios_1.default);
};
exports.router = router;
