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
exports.Controller = void 0;
class Controller {
    constructor(service) {
        this.serviceEntity = service;
    }
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.serviceEntity.getUsers();
                res.status(200).json({
                    success: {
                        usuarios: users,
                    },
                });
            }
            catch (error) {
                if (error instanceof Error)
                    res.status(404).json({ error: { message: error.message } });
            }
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const idUser = req.params.id;
            try {
                const user = yield this.serviceEntity.getUser(idUser);
                res.status(200).json({
                    success: {
                        usuario: user,
                    },
                });
            }
            catch (error) {
                if (error instanceof Error)
                    res.status(404).json({ error: { message: error.message } });
            }
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dto = req.body;
                if (!dto)
                    throw new Error("Está faltando alguma informação.");
                if (!dto.role) {
                    dto.role = "user";
                }
                const user = yield this.serviceEntity.createdUsers(dto);
                res.status(201).json({
                    success: {
                        message: "Usuario criado com sucesso.",
                        usuario: user,
                    },
                });
            }
            catch (error) {
                if (error instanceof Error)
                    res.status(404).json({ error: { message: error.message } });
            }
        });
    }
    deletedUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const idUser = req.params.id;
            try {
                const deletedUser = yield this.serviceEntity.deletedUser(idUser);
                if (!deletedUser)
                    throw new Error("Usuario não foi criado com sucesso");
                res.status(200).json({
                    success: {
                        message: "Usuario deletado com sucesso.",
                    },
                });
            }
            catch (error) {
                if (error instanceof Error)
                    res.status(404).json({ error: { message: error.message } });
            }
        });
    }
    updatedUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const idUser = req.params.id;
            const data = req.body;
            try {
                const user = yield this.serviceEntity.updatedUser(data, idUser);
                if (user)
                    res.status(200).json({
                        success: {
                            message: "Usuario atualizado com sucesso.",
                        },
                    });
            }
            catch (error) {
                if (error instanceof Error)
                    res.status(404).json({ error: { message: error.message } });
            }
        });
    }
}
exports.Controller = Controller;
