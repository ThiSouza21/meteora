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
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up(queryInterface, DataType) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.createTable("usuarios", {
                id: {
                    allowNull: false,
                    primaryKey: true,
                    type: DataType.UUID,
                    defaultValue: DataType.UUIDV4,
                },
                nome: {
                    type: DataType.STRING,
                },
                email: {
                    type: DataType.STRING,
                    unique: true,
                },
                senha: {
                    type: DataType.STRING,
                },
                role: {
                    type: DataType.ENUM("admin", "user"),
                    allowNull: false,
                },
                createdAt: {
                    allowNull: false,
                    type: DataType.DATE,
                },
                updatedAt: {
                    allowNull: false,
                    type: DataType.DATE,
                },
            });
        });
    },
    down(queryInterface) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.dropTable("usuarios");
        });
    },
};
