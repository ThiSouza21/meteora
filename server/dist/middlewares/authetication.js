"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = void 0;
require("dotenv/config");
const jsonwebtoken_1 = require("jsonwebtoken");
const authentication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
    if (!token) {
        return res.status(401).json({ error: { message: "Token não fornecido." } });
    }
    const secret = process.env.SECRET;
    if (!secret) {
        return res
            .status(500)
            .json({ error: { message: "SecretKey não encontrada." } });
    }
    try {
        const decoded = (0, jsonwebtoken_1.verify)(token, secret);
        req.user = {
            id: decoded.id,
            email: decoded.email,
        };
        next();
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.name === "TokenExpiredError") {
                return res.status(401).json({ error: { message: "Token expirado." } });
            }
            if (error.name === "JsonWebTokenError") {
                return res.status(401).json({ error: { message: "Token inválido." } });
            }
            return res.status(400).json({ error: { message: error.message } });
        }
        return res
            .status(400)
            .json({ error: { message: "Erro ao verificar token." } });
    }
});
exports.authentication = authentication;
