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
exports.authController = void 0;
const AuthService_1 = require("../services/AuthService");
class AuthController {
    constructor(service) {
        this.serviceEntity = service;
    }
    authLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, senha } = req.body;
            try {
                const loginUser = yield this.serviceEntity.login({ email, senha });
                res.cookie("token", loginUser.accessToken, {
                    maxAge: 5 * 60 * 1000,
                    httpOnly: true,
                    secure: false,
                    sameSite: "none",
                });
                res.status(200).json({ success: { message: "Usuario encontrado!" } });
            }
            catch (error) {
                if (error instanceof Error)
                    res.status(404).json({ error: { message: error.message } });
            }
        });
    }
}
exports.authController = new AuthController(AuthService_1.authService);
