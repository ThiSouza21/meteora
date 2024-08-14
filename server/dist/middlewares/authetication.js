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
    const token = req.headers.authorization;
    if (!token)
        return res
            .status(400)
            .json({ error: { message: "Token não informado na requisição." } });
    const [, accessToken] = token.split(" ");
    if (!accessToken)
        return res
            .status(400)
            .json({ error: { message: "Tipo de authentication não passado." } });
    try {
        const secret = process.env.SECRET;
        if (!secret)
            throw new Error("SecretKey não foi acessada com sucesso.");
        (0, jsonwebtoken_1.verify)(accessToken, secret);
        const { id, email } = (0, jsonwebtoken_1.decode)(accessToken);
        req.user = {
            id: id,
            email: email,
        };
        next();
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: { message: error.message } });
    }
});
exports.authentication = authentication;
