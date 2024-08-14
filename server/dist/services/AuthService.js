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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
require("dotenv/config");
const models_1 = __importDefault(require("../models"));
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthService {
    constructor(nameModel) {
        this.model = models_1.default[nameModel];
    }
    login(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const validatedUser = yield this.model.findOne({
                attributes: ["id", "email", "senha"],
                where: { email: dto.email },
            });
            if (!validatedUser)
                throw new Error("Usuario não encontrado.");
            const validatedPasswd = yield (0, bcrypt_1.compare)(dto.senha, validatedUser.get("senha"));
            if (!validatedPasswd)
                throw new Error("Usuario ou senha incorreto.");
            const secret = process.env.SECRET;
            if (!secret) {
                throw new Error("SECRET key is not defined in environment variables");
            }
            const accessToken = (0, jsonwebtoken_1.sign)({
                email: dto.email,
                id: validatedUser.get("id"),
            }, secret, { expiresIn: "5m" });
            return { accessToken };
        });
    }
}
exports.authService = new AuthService("usuarios");
