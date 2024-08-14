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
exports.Service = void 0;
const models_1 = __importDefault(require("../models"));
const uuid_1 = require("uuid");
const bcrypt_1 = require("bcrypt");
class Service {
    constructor(nameModel) {
        this.model = models_1.default[nameModel];
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.model.findAll();
            if (!users.length)
                throw new Error("Não há usuarios cadastrados");
            return users;
        });
    }
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.model.findByPk(id);
            if (!user)
                throw new Error("Usuario não cadastrado.");
            return user;
        });
    }
    createdUsers(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const emailExist = yield this.model.findOne({
                where: {
                    email: dto.email,
                },
            });
            if (emailExist)
                throw new Error("Usuario já cadastrado!");
            const passwdHash = yield (0, bcrypt_1.hash)(dto.senha, 8);
            const user = {
                id: (0, uuid_1.v4)(),
                nome: dto.nome,
                email: dto.email,
                senha: passwdHash,
            };
            const createdUser = yield this.model.create(user);
            return createdUser;
        });
    }
    deletedUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedUser = yield this.model.destroy({
                where: {
                    id,
                },
            });
            if (!deletedUser)
                return false;
            return true;
        });
    }
    updatedUser(data, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [user] = yield this.model.update(data, {
                where: {
                    id,
                },
            });
            if (!user)
                throw new Error("Usuario não cadastrado.");
            return user;
        });
    }
}
exports.Service = Service;
